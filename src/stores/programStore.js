import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class ProgramStore {
  // Various
  @observable error = '';
  @observable loading = false;
  @observable scrollIndex = 0;
  @observable selectedDayKey = '';
  @observable updateFormItem = {};
  @observable showUpdateForm = false;
  @observable selectedProgramKey = '';
  @observable screenIndex = 'primaryProgram';
  // Get program info
  @observable info = [];
  @observable days = [];
  @observable exercises = [];
  // All
  @observable allPrograms = [];
  @observable allExercises = [];

  @action updateScreenIndex = index => {
    this.scrollIndex = 0;
    this.screenIndex = index;
  }

  @action getScreenIndex = () => {
    return this.screenIndex;
  }

  @action updateSelectedDayKey = key => {
    this.selectedDayKey = key;
  }

  @action updateSelectedProgramKey = key => {
    this.selectedProgramKey = key;
  }

  @action toggleShowUpdateForm = bool => {
    this.showUpdateForm = bool;
  }

  @action getShowUpdateForm = () => {
    return this.showUpdateForm;
  }

  @action setUpdateFormItem = item => {
    this.updateFormItem = item;
  }

  @action resetError = () => {
    this.error = '';
  }

  @action fetchPrimaryProgram = () => {
    firebase.firestore().collection('userPrograms')
    .where('author', '==', firebase.auth().currentUser.uid)
    .get()
    .then(allPrograms => {
      const primaryProgram = allPrograms.docs.find(each => {
        return each.data().index === 0;
      });
      this.fetchProgram(primaryProgram.id);
    });
  }

  @action fetchProgram = (primary, selected) => {
    const program = selected || primary;
    const programRef = firebase.firestore()
    .collection('userPrograms').doc(program);

    programRef.onSnapshot(thisProgram => {
      this.loading = true;
      this.info.length = 0;
      const {
        author, frequency, description, level, name, type, index
      } = thisProgram.data();
      this.info.push({
        author, frequency, description, level, name, type, key: thisProgram.id, index
      });
      this.loading = false;
    });

    programRef.collection('days').orderBy('index').onSnapshot(querySnapshot => {
      this.loading = true;
      this.days.length = 0;
      querySnapshot.forEach(day => {
        const { author, description, key, name, primaryGroup, secondaryGroup, index } = day.data();
        this.days.push({ author, description, key, name, primaryGroup, secondaryGroup, index });
      });
      this.loading = false;
    });

    programRef.collection('exercises').orderBy('index').onSnapshot(querySnapshot => {
      this.loading = true;
      this.exercises.length = 0;
      querySnapshot.forEach(exercise => {
        const { author, day, exerciseKey, key, reps, rest, sets, index } = exercise.data();
        this.exercises.push({ author, day, exerciseKey, key, reps, rest, sets, index });
      });
      this.loading = false;
    });
  }

  @action fetchAllPrograms = () => {
    const allProgramsRef = firebase.firestore()
    .collection('userPrograms')
    .orderBy('index')
    .where('author', '==', firebase.auth().currentUser.uid);

    allProgramsRef.onSnapshot(querySnapshot => {
      this.allPrograms.length = 0;
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type, index
        } = program.data();

        this.allPrograms.push({
          type,
          name,
          index,
          level,
          author,
          program,
          frequency,
          description,
          key: program.id,
        });
      });
    });
  }

  @action fetchAllExercises = () => {
    firebase.firestore().collection('exercises').orderBy('name')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(exercise => {
        const { description, group, key, name } = exercise.data();
        this.allExercises.push({ key, name, group, description });
      });
    });
  }

  @action addProgram = values => {
    let index = 0;

    firebase.firestore()
    .collection('userPrograms')
    .where('author', '==', firebase.auth().currentUser.uid)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        index = 0;
      } else {
        querySnapshot.forEach(program => {
          const data = program.data();
          if (data.index >= index) {
            index = Number(data.index) + 1;
          }
        });
      }

      firebase.firestore().collection('userPrograms').add({
        index,
        type: values.type,
        name: values.name,
        level: values.level,
        frequency: values.frequency,
        description: values.description,
        author: firebase.auth().currentUser.uid,
      })
      .then(() => {
        this.updateScreenIndex('allPrograms');
      })
      .catch(error => {
        this.error = error.message;
      });
    });
  }

  @action addProgramDay = (values, programInfo) => {
    let index = 0;

    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('days');

    ref.get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        index = 0;
      } else {
        querySnapshot.forEach(day => {
          const data = day.data();
          if (data.index >= index) {
            index = Number(data.index) + 1;
          }
        });
      }

      const setRef = ref.doc();
      setRef.set({
        index,
        key: setRef.id,
        name: values.name,
        description: values.description,
        primaryGroup: values.primaryGroup,
        secondaryGroup: values.secondaryGroup,
        author: firebase.auth().currentUser.uid,
      })
      .then(() => {
        this.updateScreenIndex('selectedProgram');
      })
      .catch(error => {
        this.error = error.message;
      });
    });
  }

  @action addProgramExercise = (values, programInfo, selectedDayKey, selectedExerciseKey) => {
    let index = 0;

    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('exercises');

    ref.get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        index = 0;
      } else {
        querySnapshot.forEach(exercise => {
          const data = exercise.data();
          if (data.day !== selectedDayKey) return;
          if (data.index >= index) {
            index = Number(data.index) + 1;
          }
        });
      }

      const setRef = ref.doc();
      setRef.set({
        index,
        key: setRef.id,
        sets: values.sets,
        reps: values.reps,
        rest: values.rest,
        day: selectedDayKey,
        exerciseKey: selectedExerciseKey,
        author: firebase.auth().currentUser.uid,
      })
      .then(() => {
        this.updateScreenIndex('programExercises');
      })
      .catch(error => {
        this.error = error.message;
      });
    });
  }

  @action toggleUp = item => {
    // If the requested to edit item is first one
    if (item.index === 0) return;

    switch (this.screenIndex) {
      default: return;
      case 'allPrograms':
        {
          // Obtain target and use it to get the preceding element
          const target = this.allPrograms.find(program => {
            return program.key === item.key;
          });
          const subTarget = this.allPrograms[target.index - 1];

          const targetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(target.key);
          const subTargetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(subTarget.key);

          targetRef.update({
            index: Number(target.index) - 1
          })
          .catch(error => {
            this.error = error.message;
          });

          subTargetRef.update({
            index: Number(target.index)
          })
          .catch(error => {
            this.error = error.message;
          });

          // Incase new index 0
          this.fetchPrimaryProgram();
          break;
        }
      case 'primaryProgram':
      case 'selectedProgram':
       {
         // Obtain target and use it to get the preceding element
         const target = this.days.find(day => {
           return day.key === item.key;
         });
         const subTarget = this.days[target.index - 1];

         const targetRef = firebase.firestore()
         .collection('userPrograms')
         .doc(this.info[0].key)
         .collection('days')
         .doc(target.key);
         const subTargetRef = firebase.firestore()
         .collection('userPrograms')
         .doc(this.info[0].key)
         .collection('days')
         .doc(subTarget.key);

         targetRef.update({
           index: Number(target.index) - 1
         })
         .catch(error => {
           this.error = error.message;
         });

         subTargetRef.update({
           index: Number(target.index)
         })
         .catch(error => {
           this.error = error.message;
         });
         break;
       }
      case 'programExercises':
        {
          // Obtain target and use it to get the preceding element
          const target = this.exercises.find(exercise => {
            return exercise.key === item.key;
          });

          const filteredExercises = this.exercises.filter(exercise => {
            return exercise.day === this.selectedDayKey;
          });

          const subTarget = filteredExercises[target.index - 1];

          const targetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('exercises')
          .doc(target.key);
          const subTargetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('exercises')
          .doc(subTarget.key);

          targetRef.update({
            index: Number(target.index) - 1
          })
          .catch(error => {
            this.error = error.message;
          });

          subTargetRef.update({
            index: Number(target.index)
          })
          .catch(error => {
            this.error = error.message;
          });
          break;
        }
    }
  }

  @action toggleDown = item => {
    switch (this.screenIndex) {
      default: return;
      case 'allPrograms':
        {
          // If the requested to edit item is the last one
          if (item.index >= this.allPrograms.length - 1) return;
          // Obtain target and use it to get the following element
          const target = this.allPrograms.find(program => {
            return program.key === item.key;
          });
          const subTarget = this.allPrograms[target.index + 1];

          const targetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(target.key);
          const subTargetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(subTarget.key);

          targetRef.update({
            index: Number(target.index) + 1
          })
          .catch(error => {
            this.error = error.message;
          });

          subTargetRef.update({
            index: Number(target.index)
          })
          .catch(error => {
            this.error = error.message;
          });

          // Incase new index 0
          this.fetchPrimaryProgram();
          break;
        }
      case 'primaryProgram':
      case 'selectedProgram':
        {
          // If the requested to edit item is the last one
          if (item.index >= this.days.length - 1) return;
          // Obtain target and use it to get the following element
          const target = this.days.find(day => {
            return day.key === item.key;
          });
          const subTarget = this.days[target.index + 1];

          const targetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('days')
          .doc(target.key);
          const subTargetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('days')
          .doc(subTarget.key);

          targetRef.update({
            index: Number(target.index) + 1
          })
          .catch(error => {
            this.error = error.message;
          });

          subTargetRef.update({
            index: Number(target.index)
          })
          .catch(error => {
            this.error = error.message;
          });
          break;
        }
      case 'programExercises':
        {
          const filteredExercises = this.exercises.filter(exercise => {
            return exercise.day === this.selectedDayKey;
          });

          // If the requested to edit item is the last one
          if (item.index >= filteredExercises.length - 1) return;
          // Obtain target and use it to get the following element
          const target = this.exercises.find(exercise => {
            return exercise.key === item.key;
          });

          const subTarget = filteredExercises[target.index + 1];

          const targetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('exercises')
          .doc(target.key);
          const subTargetRef = firebase.firestore()
          .collection('userPrograms')
          .doc(this.info[0].key)
          .collection('exercises')
          .doc(subTarget.key);

          targetRef.update({
            index: Number(target.index) + 1
          })
          .catch(error => {
            this.error = error.message;
          });

          subTargetRef.update({
            index: Number(target.index)
          })
          .catch(error => {
            this.error = error.message;
          });
          break;
        }
    }
  }

  @action deleteProgram = deleteKey => {
    const ref = firebase.firestore()
    .collection('userPrograms');

    // Check if last program
    ref.doc(deleteKey).get()
    .then(doc => {
      if (doc.data().index === 0) {
        this.error = 'Last program can only be edited';
      } else {
        ref.doc(deleteKey).delete()
        .then(() => {
          ref.orderBy('index').get().then(querySnapshot => {
            querySnapshot.docChanges.forEach(updateProgram => {
              const updateRef = updateProgram.doc.ref.path;
              firebase.firestore().doc(updateRef)
              .update({ index: updateProgram.newIndex });
            });
          });
        })
        .catch(error => {
          this.error = error.message;
        });
      }
    });
  }

  @action deleteProgramDay = (programInfo, deleteKey) => {
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('days');

    // delete and fix indices other days
    ref.doc(deleteKey).delete()
    .then(() => {
      ref.orderBy('index').get().then(querySnapshot => {
        querySnapshot.docChanges.forEach(updateDay => {
          const updateRef = updateDay.doc.ref.path;
          firebase.firestore().doc(updateRef)
          .update({ index: updateDay.newIndex });
        });
      });
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  @action deleteProgramExercise = (programInfo, deleteKey) => {
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('exercises');

    // delete and fix indices
    ref.doc(deleteKey).delete()
    .then(() => {
      ref.orderBy('index').get().then(querySnapshot => {
        querySnapshot.docChanges.forEach(updateExercise => {
          if (updateExercise.doc.data().day !== programInfo[0].key) return;
          const updateRef = updateExercise.doc.ref.path;
          firebase.firestore().doc(updateRef)
          .update({ index: updateExercise.newIndex });
        });
      });
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  @action updateProgram = values => {
    firebase.firestore()
    .collection('userPrograms')
    .doc(this.updateFormItem.key)
    .update({
      type: values.type,
      name: values.name,
      level: values.level,
      frequency: values.frequency,
      description: values.description,
      author: firebase.auth().currentUser.uid,
    })
    .then(() => {
      this.toggleShowUpdateForm(false);
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  @action updateProgramDay = values => {
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(this.info[0].key)
    .collection('days')
    .doc(this.updateFormItem.key);

    ref.update({
      name: values.name,
      description: values.description,
      primaryGroup: values.primaryGroup,
      secondaryGroup: values.secondaryGroup,
      author: firebase.auth().currentUser.uid,
    })
    .then(() => {
      this.toggleShowUpdateForm(false);
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  @action updateProgramExercise = values => {
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(this.info[0].key)
    .collection('exercises')
    .doc(this.updateFormItem.key);

    ref.update({
      reps: values.reps,
      sets: values.sets,
      rest: values.rest,
    })
    .then(() => {
      this.toggleShowUpdateForm(false);
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  // @action addExercises = () => {
  //   exercises.map(each => {
  //     const ref = firebase.firestore().collection('exercises').doc();
  //     return (
  //       ref.set({
  //         description: each.description,
  //         group: each.group,
  //         name: each.name,
  //         key: ref.id,
  //       })
  //     );
  //   });
  // }

}

const exercises = [
  // Abs
  { description: '', group: 'Abs', name: 'Situps' },
  { description: '', group: 'Abs', name: 'Crunches' },
  { description: '', group: 'Abs', name: 'Air Bikes' },
  { description: '', group: 'Abs', name: 'Leg Raises' },
  { description: '', group: 'Abs', name: 'Side Planks' },
  { description: '', group: 'Abs', name: 'Bench Crushes' },
  { description: '', group: 'Abs', name: 'Russian Twists' },
  { description: '', group: 'Abs', name: 'Cable Crunches' },
  { description: '', group: 'Abs', name: 'Cable Wood Chops' },
  { description: '', group: 'Abs', name: 'Oblique Crunches' },
  { description: '', group: 'Abs', name: 'Cable Side Bends' },
  { description: '', group: 'Abs', name: 'Weighted Crunches' },
  { description: '', group: 'Abs', name: 'Abs Crunch Machine' },
  { description: '', group: 'Abs', name: 'Hanging Leg Raises' },
  { description: '', group: 'Abs', name: 'Abdominal Pendulum' },
  { description: '', group: 'Abs', name: 'Barbell Side Bends' },
  { description: '', group: 'Abs', name: 'Dumbbell Side Bends' },
  { description: '', group: 'Abs', name: 'Hanging Knee Raises' },
  { description: '', group: 'Abs', name: 'Barbell Abs Rollouts' },
  { description: '', group: 'Abs', name: 'Alternating Crunches' },
  { description: '', group: 'Abs', name: 'Seated Cable Crunches' },
  { description: '', group: 'Abs', name: 'Cable Reverse Crunches' },
  { description: '', group: 'Abs', name: 'Cable Oblique Crunches' },
  { description: '', group: 'Abs', name: 'Alternating Leg Raises' },
  { description: '', group: 'Abs', name: 'Kneeling Cable Crunches' },
  { description: '', group: 'Abs', name: 'Alternating Leg Bridges' },
  { description: '', group: 'Abs', name: 'Standing Cable Crunches' },
  { description: '', group: 'Abs', name: 'Kneeling Cable Pulldowns' },
  { description: '', group: 'Abs', name: 'Alternating Heel Touches' },
  { description: '', group: 'Abs', name: 'Alternating Cable Crunches' },
  { description: '', group: 'Abs', name: 'Bench Alternating Crunches' },
  { description: '', group: 'Abs', name: 'Alternating Cable Crunches' },
  { description: '', group: 'Abs', name: 'Kneeling Barbell Abs Rollouts' },
  { description: '', group: 'Abs', name: 'Kneeling Alternating Cable Crunches' },
  // Back
  { description: '', group: 'Back', name: 'Chinups' },
  { description: '', group: 'Back', name: 'Pullups' },
  { description: '', group: 'Back', name: 'Cable Rows' },
  { description: '', group: 'Back', name: 'T-Bar Rows' },
  { description: '', group: 'Back', name: 'Barbell Rows' },
  { description: '', group: 'Back', name: 'Dumbell Rows' },
  { description: '', group: 'Back', name: 'Machine Rows' },
  { description: '', group: 'Back', name: 'Cable Shrugs' },
  { description: '', group: 'Back', name: 'Inverted Rows' },
  { description: '', group: 'Back', name: 'Rope Pulldowns' },
  { description: '', group: 'Back', name: 'Barbell Shrugs' },
  { description: '', group: 'Back', name: 'Machine Shrugs' },
  { description: '', group: 'Back', name: 'Machine Pullups' },
  { description: '', group: 'Back', name: 'Dumbbell Shrugs' },
  { description: '', group: 'Back', name: 'Machine Chinups' },
  { description: '', group: 'Back', name: 'Cable Deadlifts' },
  { description: '', group: 'Back', name: 'Weighted Pullups' },
  { description: '', group: 'Back', name: 'Barbell Deadlift' },
  { description: '', group: 'Back', name: 'Hyper Extensions' },
  { description: '', group: 'Back', name: 'Seated Rope Rows' },
  { description: '', group: 'Back', name: 'Barbell Pullovers' },
  { description: '', group: 'Back', name: 'Lateral Pulldowns' },
  { description: '', group: 'Back', name: 'Dumbbell Deadlift' },
  { description: '', group: 'Back', name: 'Smith Machine Rows' },
  { description: '', group: 'Back', name: 'Machine T-Bar Rows' },
  { description: '', group: 'Back', name: 'Close Grip Pullups' },
  { description: '', group: 'Back', name: 'Barbell Rack Pulls' },
  { description: '', group: 'Back', name: 'Standing Cable Rows' },
  { description: '', group: 'Back', name: 'Barbell Cambered Rows' },
  { description: '', group: 'Back', name: 'Machine Lat Pulldowns' },
  { description: '', group: 'Back', name: 'Barbell Good Mornings' },
  { description: '', group: 'Back', name: 'Smith Machine Deadlift' },
  { description: '', group: 'Back', name: 'Back Extensions Machine' },
  { description: '', group: 'Back', name: 'Reverse Grip Barbell Rows' },
  { description: '', group: 'Back', name: 'Barbell Romanian Deadlift' },
  { description: '', group: 'Back', name: 'Barbell Incline Bench Rows' },
  { description: '', group: 'Back', name: 'Smith Machine Good Mornings' },
  { description: '', group: 'Back', name: 'Reverse Grip Barbell Deadlift' },
  // Biceps
  { description: '', group: 'Biceps', name: 'Cable Curls' },
  { description: '', group: 'Biceps', name: 'EZ Bar Curls' },
  { description: '', group: 'Biceps', name: 'Barbell Drag Curls' },
  { description: '', group: 'Biceps', name: 'Cable Hammer Curls' },
  { description: '', group: 'Biceps', name: 'Machine Bicep Curls' },
  { description: '', group: 'Biceps', name: 'Barbell Bicep Curls' },
  { description: '', group: 'Biceps', name: 'Cable Overhead Curl' },
  { description: '', group: 'Biceps', name: 'Incline Bench Curls' },
  { description: '', group: 'Biceps', name: 'Dumbell Bicep Curls' },
  { description: '', group: 'Biceps', name: 'Seated Hammer Curls' },
  { description: '', group: 'Biceps', name: 'Barbell Spider Curls' },
  { description: '', group: 'Biceps', name: 'Dumbbell Spider Curls' },
  { description: '', group: 'Biceps', name: 'Seated Overhead Curls' },
  { description: '', group: 'Biceps', name: 'EZ Bar Preacher Curls' },
  { description: '', group: 'Biceps', name: 'Seated Dumbbell Curls' },
  { description: '', group: 'Biceps', name: 'Dumbbell Hammer Curls' },
  { description: '', group: 'Biceps', name: 'Dumbbell Zottman Curls' },
  { description: '', group: 'Biceps', name: 'Barbell Preacher Curls' },
  { description: '', group: 'Biceps', name: 'Dumbbell Preacher Curls' },
  { description: '', group: 'Biceps', name: 'Incline Bench Hammer Curls' },
  { description: '', group: 'Biceps', name: 'Barbell Concentration Curls' },
  { description: '', group: 'Biceps', name: 'Dumbbell Concentration Curls' },
  // Calves
  { description: '', group: 'Calves', name: 'Band Calf Raises' },
  { description: '', group: 'Calves', name: 'Seated Calf Raises' },
  { description: '', group: 'Calves', name: 'Standing Calf Raises' },
  { description: '', group: 'Calves', name: 'Leg Press Calf Presses' },
  { description: '', group: 'Calves', name: 'Hack Machine Calf Raises' },
  { description: '', group: 'Calves', name: 'Smith Machine Calf Raises' },
  { description: '', group: 'Calves', name: 'Seated Barbell Calf Raises' },
  { description: '', group: 'Calves', name: 'Seated Dumbbell Calf Raises' },
  { description: '', group: 'Calves', name: 'Standing Barbell Calf Raises' },
  { description: '', group: 'Calves', name: 'Standing Barbell Calf Raises' },
  { description: '', group: 'Calves', name: 'Standing Dumbbell Calf Raises' },
  // Chest
  { description: '', group: 'Chest', name: 'Wide Pushups' },
  { description: '', group: 'Chest', name: 'Clap Pushups' },
  { description: '', group: 'Chest', name: 'Drop Pushups' },
  { description: '', group: 'Chest', name: 'Bench Pushups' },
  { description: '', group: 'Chest', name: 'Narrow Pushups' },
  { description: '', group: 'Chest', name: 'Dumbbell Flyes' },
  { description: '', group: 'Chest', name: 'Bands Cross Over' },
  { description: '', group: 'Chest', name: 'Cable Cross Overs' },
  { description: '', group: 'Chest', name: 'Barbell Pullovers' },
  { description: '', group: 'Chest', name: 'Butterfly Machine' },
  { description: '', group: 'Chest', name: 'Bands Bench Press' },
  { description: '', group: 'Chest', name: 'Butterfly Machine' },
  { description: '', group: 'Chest', name: 'Single Leg Pushups' },
  { description: '', group: 'Chest', name: 'Barbell Neck Press' },
  { description: '', group: 'Chest', name: 'Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Cable Decline Press' },
  { description: '', group: 'Chest', name: 'Cable Incline Press' },
  { description: '', group: 'Chest', name: 'Cable Incline Flyes' },
  { description: '', group: 'Chest', name: 'Cable Decline Flyes' },
  { description: '', group: 'Chest', name: 'Barbell Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Incline Flyes' },
  { description: '', group: 'Chest', name: 'Dumbbell Decline Flyes' },
  { description: '', group: 'Chest', name: 'Cable Decline Chest Flyes' },
  { description: '', group: 'Chest', name: 'Smith Machine Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Decline Pullovers' },
  { description: '', group: 'Chest', name: 'Decline Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Incline Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Barbell Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Smith Machine Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Smith Machine Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Reverse Grip Incline Bench Press' },
  // Forearms
  { description: '', group: 'Forearms', name: 'Cable Wrist Curls' },
  { description: '', group: 'Forearms', name: 'EZ Bar Wrist Curls' },
  { description: '', group: 'Forearms', name: 'Barbell Wrist Curls' },
  { description: '', group: 'Forearms', name: 'Dumbell Wrist Curls' },
  { description: '', group: 'Forearms', name: 'Smith Machine Wrist Curls' },
  { description: '', group: 'Forearms', name: 'Barbell Reversed Wrist Curls' },
  { description: '', group: 'Forearms', name: 'Barbell Preacher Wrist Curls' },
  // Glutes
  { description: '', group: 'Glutes', name: 'Flutter Kicks' },
  { description: '', group: 'Glutes', name: 'Hip Abduction' },
  { description: '', group: 'Glutes', name: 'Barbell Bridges' },
  { description: '', group: 'Glutes', name: 'Glute Kickbacks' },
  { description: '', group: 'Glutes', name: 'Kneeling Squats' },
  { description: '', group: 'Glutes', name: 'Barbell Hip Thrusts' },
  { description: '', group: 'Glutes', name: 'Smith Machine Lunges' },
  { description: '', group: 'Glutes', name: 'Machine Hip Abduction' },
  { description: '', group: 'Glutes', name: 'Barbell Lateral Lunges' },
  // Shoulders
  { description: '', group: 'Shoulders', name: 'Band Upright Rows' },
  { description: '', group: 'Shoulders', name: 'Cable Upright Rows' },
  { description: '', group: 'Shoulders', name: 'Barbell Clean & Jerk' },
  { description: '', group: 'Shoulders', name: 'Barbell Front Raises' },
  { description: '', group: 'Shoulders', name: 'Barbell Upright Rows' },
  { description: '', group: 'Shoulders', name: 'Barbell Push Presses' },
  { description: '', group: 'Shoulders', name: 'Band Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Dumbbell Front Raises' },
  { description: '', group: 'Shoulders', name: 'Dumbbell Cuban Presses' },
  { description: '', group: 'Shoulders', name: 'Dumbbell Lateral Raises' },
  { description: '', group: 'Shoulders', name: 'Dumbbell Arnold Presses' },
  { description: '', group: 'Shoulders', name: 'Standing Arnold Presses' },
  { description: '', group: 'Shoulders', name: 'Barbell Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Machine Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Dumbbell Palms-in Presses' },
  { description: '', group: 'Shoulders', name: 'Seated Cable Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Smith Machine Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Standing Barbell Shoulder Presses' },
  { description: '', group: 'Shoulders', name: 'Standing Dumbbell Shoulder Presses' },
  // Triceps
  { description: '', group: 'Triceps', name: 'Bench Dips' },
  { description: '', group: 'Triceps', name: 'Machine Dips' },
  { description: '', group: 'Triceps', name: 'Rope Pushdowns' },
  { description: '', group: 'Triceps', name: 'Skull Crushers' },
  { description: '', group: 'Triceps', name: 'Cable Kickbacks' },
  { description: '', group: 'Triceps', name: 'Cable Pushdowns' },
  { description: '', group: 'Triceps', name: 'Dumbbell Kickbacks' },
  { description: '', group: 'Triceps', name: 'Weighted Bench Dips' },
  { description: '', group: 'Triceps', name: 'Overhead Rope Extensions' },
  { description: '', group: 'Triceps', name: 'Laying EZ Bar Extensions' },
  { description: '', group: 'Triceps', name: 'Overhead Cable Extensions' },
  { description: '', group: 'Triceps', name: 'Laying Triceps Extensions' },
  { description: '', group: 'Triceps', name: 'Laying Dumbbell Extensions' },
  { description: '', group: 'Triceps', name: 'Machine Triceps Extensions' },
  { description: '', group: 'Triceps', name: 'Close Grip Barbell Bench Presses' },
];

const programStore = new ProgramStore();

export default programStore;
export { programStore };

import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

class ProgramStore {
  // Various
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

  @action updateSelectedDayKey = key => {
    this.selectedDayKey = key;
  }

  @action updateSelectedProgramKey = key => {
    this.selectedProgramKey = key;
  }

  @action toggleShowUpdateForm = bool => {
    this.showUpdateForm = bool;
  }

  @action setUpdateFormItem = item => {
    this.updateFormItem = item;
  }

  @action fetchPrimaryProgram = () => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.fetchProgram(userDoc.data().primaryProgram);
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
      this.loading = true;
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
      this.loading = false;
    });
  }

  @action fetchAllExercises = () => {
    this.loading = true;

    firebase.firestore().collection('exercises').orderBy('name')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(exercise => {
        const { description, group, key, name } = exercise.data();
        this.allExercises.push({ key, name, group, description });
      });
    });
    this.loading = false;
  }

  @action addProgram = values => {
    let index = 0;

    firebase.firestore()
    .collection('userPrograms')
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
    // IMPLEMENT does nto need programinfo, use this.into instead like in update

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
          const subTarget = this.exercises[target.index - 1];

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
          // If the requested to edit item is the last one
          if (item.index >= this.exercises.length - 1) return;
          // Obtain target and use it to get the following element
          const target = this.exercises.find(exercise => {
            return exercise.key === item.key;
          });
          const subTarget = this.exercises[target.index + 1];

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
    firebase.firestore()
    .collection('userPrograms')
    .doc(deleteKey)
    .delete()
    .catch(error => {
      this.error = error.message;
    });
  }

  @action deleteProgramDay = (programInfo, deleteKey) => {
    const programDaysRef = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('days');

    // delete and fix indices other days
    programDaysRef.doc(deleteKey).delete()
    .then(() => {
      programDaysRef.orderBy('index').get().then(querySnapshot => {
        querySnapshot.docChanges.map(updateDay => {
          const updateRef = updateDay.doc.ref.path;
          firebase.firestore().doc(updateRef).update({ index: updateDay.newIndex });
        });

        querySnapshot.forEach(info => {
          // const day = info.data();
          // const remainingDaysRef = info.ref.path;
          // remainingDaysRef.update({ index: 1 });
        });
      });
    })
    .catch(error => {
      this.error = error.message;
    });
  }

  @action deleteProgramExercise = (programInfo, deleteKey) => {
    firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('exercises')
    .doc(deleteKey)
    .delete()
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


  @action addExercises = () => {
    exercises.map(each => {
      const ref = firebase.firestore().collection('exercises').doc();
      return (
        ref.set({
          description: each.description,
          group: each.group,
          name: each.name,
          key: ref.id,
        })
      );
    });
  }
}

const exercises = [
  { description: '', group: 'Chest', name: 'Single Leg Pushups' },
  { description: '', group: 'Chest', name: 'Bands Bench Press' },
  { description: '', group: 'Chest', name: 'Bands Cross Over' },
  { description: '', group: 'Chest', name: 'Barbell Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Decline Pullovers' },
  { description: '', group: 'Chest', name: 'Barbell Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Barbell Neck Press' },
  { description: '', group: 'Chest', name: 'Barbell Pullovers' },
  { description: '', group: 'Chest', name: 'Barbell Reverse Grip Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Wide Grip Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Incline Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Decline Bench Press Machine' },
  { description: '', group: 'Chest', name: 'Bench Pushups' },
  { description: '', group: 'Chest', name: 'Butterfly Machine' },
  { description: '', group: 'Chest', name: 'Cable Cross Overs' },
  { description: '', group: 'Chest', name: 'Cable Decline Chest Flyes' },
  { description: '', group: 'Chest', name: 'Cable Decline Press' },
  { description: '', group: 'Chest', name: 'Cable Incline Press' },
  { description: '', group: 'Chest', name: 'Cable Incline Flyes' },
  { description: '', group: 'Chest', name: 'Cable Decline Flyes' },
  { description: '', group: 'Chest', name: 'Butterfly Machine' },
  { description: '', group: 'Chest', name: 'Clap Pushups' },
  { description: '', group: 'Chest', name: 'Narrow Pushups' },
  { description: '', group: 'Chest', name: 'Wide Pushups' },
  { description: '', group: 'Chest', name: 'Drop Pushups' },
  { description: '', group: 'Chest', name: 'Dumbbell Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Decline Bench Press' },
  { description: '', group: 'Chest', name: 'Dumbbell Flyes' },
  { description: '', group: 'Chest', name: 'Dumbbell Decline Flyes' },
  { description: '', group: 'Chest', name: 'Dumbbell Incline Flyes' },
  { description: '', group: 'Chest', name: 'Smith Machine Bench Press' },
  { description: '', group: 'Chest', name: 'Smith Machine Incline Bench Press' },
  { description: '', group: 'Chest', name: 'Smith Machine Decline Bench Press' },
];

const programStore = new ProgramStore();

export default programStore;
export { programStore };

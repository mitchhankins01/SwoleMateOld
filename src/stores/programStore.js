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
        author, frequency, description, level, name, type
      } = thisProgram.data();
      this.info.push({
        author, frequency, description, level, name, type, key: thisProgram.id
      });
      this.loading = false;
    });

    programRef.collection('days').onSnapshot(querySnapshot => {
      this.loading = true;
      this.days.length = 0;
      querySnapshot.forEach(day => {
        const { author, description, key, name, primaryGroup, secondaryGroup } = day.data();
        this.days.push({ author, description, key, name, primaryGroup, secondaryGroup });
      });
      this.loading = false;
    });

    programRef.collection('exercises').onSnapshot(querySnapshot => {
      this.loading = true;
      this.exercises.length = 0;
      querySnapshot.forEach(exercise => {
        const { author, day, exerciseKey, key, reps, rest, sets } = exercise.data();
        this.exercises.push({ author, day, exerciseKey, key, reps, rest, sets });
      });
      this.loading = false;
    });
  }

  @action fetchAllPrograms = () => {
    const allProgramsRef = firebase.firestore()
    .collection('userPrograms')
    .where('author', '==', firebase.auth().currentUser.uid);

    allProgramsRef.onSnapshot(querySnapshot => {
      this.loading = true;
      this.allPrograms.length = 0;
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type
        } = program.data();

        this.allPrograms.push({
          type,
          name,
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
    firebase.firestore().collection('userPrograms').add({
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
  }

  @action addProgramDay = (values, programInfo) => {
    // IMPLEMENT does nto need programinfo, use this.into instead like in update
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('days')
    .doc();

    ref.set({
      key: ref.id,
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
  }

  @action addProgramExercise = (values, programInfo, selectedDayKey, selectedExerciseKey) => {
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('exercises')
    .doc();

    ref.set({
      key: ref.id,
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
    firebase.firestore()
    .collection('userPrograms')
    .doc(programInfo[0].key)
    .collection('days')
    .doc(deleteKey)
    .delete()
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

import firebase from 'react-native-firebase';

// Various
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
export const UPDATE_SELECTED_DAY_KEY = 'UPDATE_SELECTED_DAY_KEY';
// Add New Program
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const ADD_PROGRAM_FAILURE = 'ADD_PROGRAM_FAILURE';
// Add New Program Day
export const ADD_PROGRAM_DAY = 'ADD_PROGRAM_DAY';
export const ADD_PROGRAM_DAY_FAILURE = 'ADD_PROGRAM_DAY_FAILURE';
// Add New Program Exercise
export const ADD_PROGRAM_EXERCISE = 'ADD_PROGRAM_EXERCISE';
export const ADD_PROGRAM_EXERCISE_FAILURE = 'ADD_PROGRAM_EXERCISE_FAILURE';

// Various
export const updateScreenIndex = index => {
  return {
    payload: index,
    type: UPDATE_SCREEN_INDEX,
  };
};

export const updateSelectedDayKey = key => {
  return {
    payload: key,
    type: UPDATE_SELECTED_DAY_KEY,
  };
};

// Add Program
export const addProgram = values => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore().collection('userPrograms');

    ref.add({
      author: uid,
      type: values.type,
      name: values.name,
      level: values.level,
      frequency: values.frequency,
      description: values.description,
    })
    .then(() => {
      dispatch(updateScreenIndex('allPrograms'));
    })
    .catch(error => {
      // Implement
    });
  };
};

// Add Program Day
export const addProgramDay = (values, programInfo) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;
    const uid = firebase.auth().currentUser.uid;

    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('days')
    .doc();

    ref.set({
      author: uid,
      key: ref.id,
      name: values.name,
      description: values.description,
      primaryGroup: values.primaryGroup,
      secondaryGroup: values.secondaryGroup,
    })
    .then(() => {
      dispatch(updateScreenIndex('selectedProgram'));
    })
    .catch(error => {
      console.log(error.message);
    });
  };
};

// Add Program Exercise
export const addProgramExercise = (values, programInfo, selectedDayKey, selectedExerciseKey) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;

    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('exercises')
    .doc();

    ref.set({
      author: uid,
      key: ref.id,
      sets: values.sets,
      reps: values.reps,
      rest: values.rest,
      day: selectedDayKey,
      exerciseKey: selectedExerciseKey,
    })
    .then(() => {
      dispatch(updateScreenIndex('programExercises'));
    })
    .catch(error => {
      // Implement
    });
  };
};

// Delete
export const deleteProgram = deleteKey => {
  return (dispatch) => {
    firebase.firestore().collection('userPrograms').doc(deleteKey)
    .delete()
    .catch(error => {
      // Implement
    });
  };
};

export const deleteProgramDay = (programInfo, deleteKey) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;

    firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('days')
    .doc(deleteKey)
    .delete()
    .catch(error => {
      // IMPLEMENT error handeling
    });
  };
};

export const deleteProgramExercise = (programInfo, deleteKey) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;

    firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('exercises')
    .doc(deleteKey)
    .delete()
    .catch(error => {
      // Implement
    });
  };
};

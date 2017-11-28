import firebase from 'react-native-firebase';

// Screen Index
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
// Fetch All Programs
export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_ALL_PROGRAMS_FAILURE = 'FETCH_ALL_PROGRAMS_FAILURE';
export const FETCH_ALL_PROGRAMS_SUCCESS = 'FETCH_ALL_PROGRAMS_SUCCESS';
// Fetch Selected from All Programs
export const FETCH_ALL_PROGRAMS_SELECTED = 'FETCH_ALL_PROGRAMS_SELECTED';
export const FETCH_ALL_PROGRAMS_SELECTED_FAILURE = 'FETCH_ALL_PROGRAMS_SELECTED_FAILURE';
export const FETCH_ALL_PROGRAMS_SELECTED_SUCCESS = 'FETCH_ALL_PROGRAMS_SELECTED_SUCCESS';
// Fetch Primary Programs
export const FETCH_PRIMARY_PROGRAM = 'FETCH_PRIMARY_PROGRAM';
export const FETCH_PRIMARY_PROGRAM_FAILURE = 'FETCH_PRIMARY_PROGRAM_FAILURE';
export const FETCH_PRIMARY_PROGRAM_SUCCESS = 'FETCH_PRIMARY_PROGRAM_SUCCESS';
// Add New Program
export const ADD_NEW_PROGRAM = 'ADD_NEW_PROGRAM';
export const ADD_NEW_PROGRAM_FAILURE = 'ADD_NEW_PROGRAM_FAILURE';

// Screen Index
export const updateScreenIndex = index => {
  return {
    payload: index,
    type: UPDATE_SCREEN_INDEX,
  };
};

// All Programs
export const fetchAllPrograms = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PROGRAMS });

    const uid = firebase.auth().currentUser.uid;
    const programs = [];

    firebase.firestore().collection('userPrograms').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type
        } = program.data();

        programs.push({
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
      fetchAllProgramsSuccess(dispatch, programs);
    })
    .catch(error => {
      fetchAllProgramsFailure(dispatch, error);
    });
  };
};

const fetchAllProgramsFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_ALL_PROGRAMS_FAILURE,
  });
};

const fetchAllProgramsSuccess = (dispatch, programs) => {
  dispatch({
    payload: programs,
    type: FETCH_ALL_PROGRAMS_SUCCESS,
  });
};

// Selected from All Programs
export const fetchAllProgramsSelected = allProgramSelectedKey => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PROGRAMS_SELECTED });

    const days = [];
    const exercises = [];

    const allProgramsSelectedRef = firebase.firestore()
      .collection('userPrograms').doc(allProgramSelectedKey);

    allProgramsSelectedRef.collection('days').get()
    .then(querySnapshot => {
      querySnapshot.forEach(day => {
        const { key, name } = day.data();
        days.push({ key, name });
      });
    })
    .catch(error => {
      fetchAllProgramsSelectedFailure(dispatch, error);
    });

    allProgramsSelectedRef.collection('exercises').get()
    .then(querySnapshot => {
      querySnapshot.forEach(details => {
        const { day, name, sets, reps, rest } = details.data();
        exercises.push({ key: details.id, day, name, sets, reps, rest });
      });
      fetchAllProgramsSelectedSuccess(dispatch, days, exercises);
    })
    .catch(error => {
      fetchAllProgramsSelectedFailure(dispatch, error);
    });
  };
};

const fetchAllProgramsSelectedFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_ALL_PROGRAMS_SELECTED_FAILURE,
  });
};

const fetchAllProgramsSelectedSuccess = (dispatch, days, exercises) => {
  dispatch({
    days,
    exercises,
    type: FETCH_ALL_PROGRAMS_SELECTED_SUCCESS,
  });
};

// Primary Program
export const fetchPrimaryProgram = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PRIMARY_PROGRAM });

    const info = [];
    const days = [];
    const exercises = [];

    // Testing using onSnapshot
    // const uid = firebase.auth().currentUser.uid;
    // firebase.firestore().collection('users').doc(uid)
    // .onSnapshot(userDoc => {
    //   console.log(userDoc.data());
    // }, (error) => {
    //   console.log(error);
    // });

    // Get primaryProgram key and program details
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).get()
    .then(userDoc => {
      const primaryProgramRef = firebase.firestore()
        .collection('userPrograms').doc(userDoc.data().primaryProgram);

      primaryProgramRef.get()
      .then(primaryProgram => {
        const { author, frequency, description, level, name, type } = primaryProgram.data();
        info.push({ author, frequency, description, level, name, type });
      })
      .catch(error => {
        fetchPrimaryProgramFailure(dispatch, error);
      });

      primaryProgramRef.collection('days').get()
      .then(querySnapshot => {
        querySnapshot.forEach(day => {
          const { key, name } = day.data();
          days.push({ key, name });
        });
      })
      .catch(error => {
        fetchPrimaryProgramFailure(dispatch, error);
      });

      primaryProgramRef.collection('exercises').get()
      .then(querySnapshot => {
        querySnapshot.forEach(details => {
          const { day, name, sets, reps, rest } = details.data();
          exercises.push({ key: details.id, day, name, sets, reps, rest });
        });
        fetchPrimaryProgramSuccess(dispatch, info, days, exercises);
      })
      .catch(error => {
        fetchPrimaryProgramFailure(dispatch, error);
      });
    })
    .catch(error => {
      fetchPrimaryProgramFailure(dispatch, error);
    });
  };
};

const fetchPrimaryProgramFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_PRIMARY_PROGRAM_FAILURE,
  });
};

const fetchPrimaryProgramSuccess = (dispatch, info, days, exercises) => {
  dispatch({
    info,
    days,
    exercises,
    type: FETCH_PRIMARY_PROGRAM_SUCCESS,
  });
};

// Add Program
export const addNewProgram = (programName, description, type, level, frequency, callback) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_PROGRAM });

    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore().collection('userPrograms');

    ref.add({
      type,
      level,
      frequency,
      author: uid,
      description,
      name: programName,
    })
    .then(() => {
      callback();
    })
    .catch(error => {
      addNewProgramFailure(dispatch, error);
    });
  };
};

const addNewProgramFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: ADD_NEW_PROGRAM_FAILURE,
  });
};

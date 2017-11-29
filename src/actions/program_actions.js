import firebase from 'react-native-firebase';

// Screen Index
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
// Fetch All Programs
export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_ALL_PROGRAMS_FAILURE = 'FETCH_ALL_PROGRAMS_FAILURE';
export const FETCH_ALL_PROGRAMS_SUCCESS = 'FETCH_ALL_PROGRAMS_SUCCESS';
// Fetch Program
export const FETCH_PROGRAM = 'FETCH_PROGRAM';
export const FETCH_PROGRAM_FAILURE = 'FETCH_PROGRAM_FAILURE';
export const FETCH_PROGRAM_SUCCESS = 'FETCH_PROGRAM_SUCCESS';
// Add New Program
export const ADD_NEW_PROGRAM = 'ADD_NEW_PROGRAM';
export const ADD_NEW_PROGRAM_FAILURE = 'ADD_NEW_PROGRAM_FAILURE';
// Add New Program Day
export const ADD_NEW_PROGRAM_DAY = 'ADD_NEW_PROGRAM_DAY';
export const ADD_NEW_PROGRAM_DAY_FAILURE = 'ADD_NEW_PROGRAM_DAY_FAILURE';

// Screen Index
export const updateScreenIndex = index => {
  return {
    payload: index,
    type: UPDATE_SCREEN_INDEX,
  };
};

// Fetch All Programs
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

// Fetch Program
export const fetchProgram = selectedProgram => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROGRAM });

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
      const program = selectedProgram || userDoc.data().primaryProgram;

      const programRef = firebase.firestore()
        .collection('userPrograms').doc(program);

      programRef.get()
      .then(thisProgram => {
        const { author, frequency, description, level, name, type } = thisProgram.data();
        info.push({ author, frequency, description, level, name, type, key: thisProgram.id });
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });

      programRef.collection('days').get()
      .then(querySnapshot => {
        querySnapshot.forEach(day => {
          const { key, name } = day.data();
          days.push({ key, name });
        });
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });

      programRef.collection('exercises').get()
      .then(querySnapshot => {
        querySnapshot.forEach(details => {
          const { day, name, sets, reps, rest } = details.data();
          exercises.push({ key: details.id, day, name, sets, reps, rest });
        });
        fetchProgramSuccess(dispatch, info, days, exercises);
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });
    })
    .catch(error => {
      fetchProgramFailure(dispatch, error);
    });
  };
};

const fetchProgramFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_PROGRAM_FAILURE,
  });
};

const fetchProgramSuccess = (dispatch, info, days, exercises) => {
  dispatch({
    info,
    days,
    exercises,
    type: FETCH_PROGRAM_SUCCESS,
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

// Add Program
export const addNewProgramDay =
 (programKey, dayName, dayDescription, primaryGroup, secondaryGroup, callback) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_PROGRAM_DAY });

    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore().collection('userPrograms')
      .doc(programKey).collection('days').doc();

    ref.set({
      author: uid,
      key: ref.id,
      primaryGroup,
      name: dayName,
      secondaryGroup,
      description: dayDescription,
    })
    .then(() => {
      callback();
    })
    .catch(error => {
      addNewProgramDayFailure(dispatch, error);
    });
  };
};

const addNewProgramDayFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: ADD_NEW_PROGRAM_DAY_FAILURE,
  });
};

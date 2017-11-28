import firebase from 'react-native-firebase';

// Screen Index
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
// Fetch All Programs
export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_ALL_PROGRAMS_SUCCESS = 'FETCH_ALL_PROGRAMS_SUCCESS';
export const FETCH_ALL_PROGRAMS_FAILURE = 'FETCH_ALL_PROGRAMS_FAILURE';
// Fetch Primary Programs
export const FETCH_PRIMARY_PROGRAM = 'FETCH_PRIMARY_PROGRAM';
export const FETCH_PRIMARY_PROGRAM_SUCCESS = 'FETCH_PRIMARY_PROGRAM_SUCCESS';
export const FETCH_PRIMARY_PROGRAM_FAILURE = 'FETCH_PRIMARY_PROGRAM_FAILURE';

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

    firebase.firestore().collection('userProgramsTest').where('author', '==', uid)
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

// Primary Program
export const fetchPrimaryProgram = primaryProgramKey => {
  return (dispatch) => {
    dispatch({ type: FETCH_PRIMARY_PROGRAM });

    const info = [];
    const days = [];
    const exercises = [];

    const primaryProgramRef = firebase.firestore()
      .collection('userPrograms').doc(primaryProgramKey);

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

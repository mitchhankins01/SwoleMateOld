import firebase from 'react-native-firebase';

// Screen Index
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
// Fetch Programs
export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_PRIMARY_PROGRAM = 'FETCH_PRIMARY_PROGRAM';
export const FETCH_ALL_PROGRAMS_SUCCESS = 'FETCH_ALL_PROGRAMS_SUCCESS';
export const FETCH_ALL_PROGRAMS_FAILURE = 'FETCH_ALL_PROGRAMS_FAILURE';

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

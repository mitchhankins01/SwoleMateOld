import firebase from 'react-native-firebase';
import {
  GET_PROGRAM,
  GET_PROGRAMS,
  GET_PROGRAM_FAIL,
  GET_PROGRAMS_FAIL,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAMS_SUCCESS,
} from '../Types/Program';

const getProgramsFail = (dispatch, error) => {
  dispatch({
    type: GET_PROGRAMS_FAIL,
    payload: error,
  });
};

const getProgramsSuccess = (dispatch, program) => {
  dispatch({
    type: GET_PROGRAMS_SUCCESS,
    payload: program,
  });
};
export const test = test2 => test2;

export const getPrograms = () => (dispatch) => {
  dispatch({ type: GET_PROGRAMS });

  const programs = [];
  const programsRef = firebase
    .firestore()
    .collection('userPrograms')
    .orderBy('index')
    .where('author', '==', firebase.auth().currentUser.uid);

  programsRef.onSnapshot(
    (querySnapshot) => {
      querySnapshot.forEach((program) => {
        const data = program.data();
        programs.push({ ...data, id: program.id });
      });
      getProgramsSuccess(dispatch, programs);
    },
    (error) => {
      getProgramsFail(dispatch, error.message);
    },
  );
};

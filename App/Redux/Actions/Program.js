import firebase from 'react-native-firebase';
import {
  TOGGLE_EXERCISES,
  GET_PROGRAM,
  GET_PROGRAMS,
  GET_PROGRAM_FAIL,
  GET_PROGRAMS_FAIL,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAMS_SUCCESS,
} from '../Types/Program';

export const toggleExercises = (bool, dayKey) => (dispatch) => {
  dispatch({
    type: TOGGLE_EXERCISES,
    payload: { bool, dayKey },
  });
};

const getProgramFail = (dispatch, error) => {
  dispatch({
    type: GET_PROGRAM_FAIL,
    payload: error,
  });
};

const getProgramSuccess = (dispatch, info, days, exercises) => {
  dispatch({
    type: GET_PROGRAM_SUCCESS,
    payload: { info, days, exercises },
  });
};

export const getProgram = (dispatch, programs, selected) => {
  dispatch({ type: GET_PROGRAM });

  let id;
  if (!selected) {
    programs.forEach((p) => {
      if (p.index === 0) id = p.id;
    });
  } else id = selected;

  const info = [];
  const days = [];
  const exercises = [];
  const programRef = firebase
    .firestore()
    .collection('userPrograms')
    .doc(id);

  programRef.onSnapshot(
    (thisProgram) => {
      info.length = 0;
      const data = thisProgram.data();
      info.push({ ...data, id: thisProgram.id });
      getProgramSuccess(dispatch, info, days, exercises);
    },
    (error) => {
      getProgramFail(dispatch, error.message);
    },
  );

  programRef
    .collection('days')
    .orderBy('index')
    .onSnapshot(
      (querySnapshot) => {
        days.length = 0;
        querySnapshot.forEach((day) => {
          const data = day.data();
          days.push({ ...data, type: 'workout' });
        });
        getProgramSuccess(dispatch, info, days, exercises);
      },
      (error) => {
        getProgramFail(dispatch, error.message);
      },
    );

  programRef
    .collection('exercises')
    .orderBy('index')
    .onSnapshot(
      (querySnapshot) => {
        exercises.length = 0;
        querySnapshot.forEach((exercise) => {
          const data = exercise.data();
          exercises.push({ ...data, type: 'exercise' });
        });
        getProgramSuccess(dispatch, info, days, exercises);
      },
      (error) => {
        getProgramFail(dispatch, error.message);
      },
    );
};

const getProgramsFail = (dispatch, error) => {
  dispatch({
    type: GET_PROGRAMS_FAIL,
    payload: error,
  });
};

const getProgramsSuccess = (dispatch, programs, allExercises) => {
  dispatch({
    type: GET_PROGRAMS_SUCCESS,
    payload: { programs, allExercises },
  });
};

export const getPrograms = () => (dispatch) => {
  dispatch({ type: GET_PROGRAMS });

  const programs = [];
  const allExercises = [];
  const programsRef = firebase
    .firestore()
    .collection('userPrograms')
    .orderBy('index')
    .where('author', '==', firebase.auth().currentUser.uid);

  firebase
    .firestore()
    .collection('exercises')
    .orderBy('name')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((exercise) => {
        const data = exercise.data();
        allExercises.push(data);
      });
    });

  programsRef.onSnapshot(
    (querySnapshot) => {
      querySnapshot.forEach((program) => {
        const data = program.data();
        programs.push({ ...data, id: program.id });
      });
      getProgram(dispatch, programs, null);
      getProgramsSuccess(dispatch, programs, allExercises);
    },
    (error) => {
      getProgramsFail(dispatch, error.message);
    },
  );
};

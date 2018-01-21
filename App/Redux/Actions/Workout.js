import firebase from 'react-native-firebase';
import { SET_REPS, SET_WEIGHT, INIT_WORKOUT, NEXT_EXERCISE, ON_PRESS_SAVE } from '../Types/Workout';

export const setReps = number => (dispatch) => {
  dispatch({
    type: SET_REPS,
    payload: number,
  });
};

export const setWeight = number => (dispatch) => {
  dispatch({
    type: SET_WEIGHT,
    payload: number,
  });
};

export const initWorkout = exerciseList => async (dispatch) => {
  const logsRef = firebase
    .firestore()
    .collection('userLogs')
    .orderBy('completed', 'asc')
    .where('author', '==', firebase.auth().currentUser.uid);

  try {
    const querySnapshot = await logsRef.get();
    const refs = querySnapshot.docs.map(log => log.ref.collection('exercises'));
    const logsRaw = refs.map(each => each.get().then(({ docs }) => docs.map(item => item.data())));
    const logs = await Promise.all(logsRaw).then(data => data.filter(log => log.length > 0));

    dispatch({
      type: INIT_WORKOUT,
      payload: { exerciseList, logs },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: INIT_WORKOUT,
      payload: { exerciseList },
    });
  }
};

export const nextExercise = index => (dispatch) => {
  dispatch({
    type: NEXT_EXERCISE,
    payload: index,
  });
};

export const onPressSave = () => (dispatch, getState) => {
  console.log(getState());
  dispatch({
    type: ON_PRESS_SAVE,
  });
};

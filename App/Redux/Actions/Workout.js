import firebase from 'react-native-firebase';
import {
  SET_REPS,
  SET_WEIGHT,
  INIT_WORKOUT,
  NEXT_EXERCISE,
  ON_PRESS_SAVE,
  CHANGE_EXERCISE,
} from '../Types/Workout';

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

export const onPressSave = () => (dispatch, getState) => {
  const {
    workout: {
      input: { setIndex }, exercise: {
        sets, exerciseList, exerciseKey, exerciseIndex,
      },
    },
  } = getState();

  dispatch({
    type: ON_PRESS_SAVE,
    payload: exerciseKey,
  });

  if (sets <= setIndex + 1) {
    dispatch({
      type: NEXT_EXERCISE,
      payload: exerciseList[exerciseIndex + 1],
    });
  }
};

export const changeExercise = index => (dispatch, getState) => {
  const { workout: { exercise: { exerciseList } } } = getState();
  dispatch({
    type: CHANGE_EXERCISE,
    payload: exerciseList[index],
  });
};

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

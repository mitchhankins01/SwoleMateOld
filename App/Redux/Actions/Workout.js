import firebase from 'react-native-firebase';
import { SET_REPS, SET_WEIGHT, INIT_WORKOUT } from '../Types/Workout';

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
    .orderBy('completed', 'desc')
    .where('author', '==', firebase.auth().currentUser.uid);

  try {
    const querySnapshot = await logsRef.get();
    const refs = querySnapshot.docs.map((log) => {
      const ref = log.ref.collection('exercises');
      return ref;
    });
    const logsRaw = refs.map(each => each.get().then(log => log));
    const logsData = logsRaw.map(each => each.then(({ docs }) => docs.map(doc => doc.data())));
    const logsPromises = logsData.map(each => each.then(log => log));
    const logs = await Promise.all(logsPromises).then(data => data);

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

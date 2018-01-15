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

// export const initWorkout = exerciseList => (dispatch) => {
//   dispatch({
//     type: INIT_WORKOUT,
//     payload: exerciseList,
//   });
// };

export const initWorkout = exerciseList => async (dispatch) => {
  const listWithLogs = [];
  const logsRef = firebase
    .firestore()
    .collection('userLogs')
    .orderBy('completed', 'desc')
    .where('author', '==', firebase.auth().currentUser.uid);

  logsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((log) => {
      log.ref.collection('exercises').onSnapshot((snapShot) => {
        snapShot.forEach((exerciseLogInfo) => {
          const exerciseLog = exerciseLogInfo.data();
          exerciseList.forEach((exercise) => {
            if (exercise.exerciseKey === exerciseLog.exerciseKey) {
              listWithLogs.push({ ...exercise, ...exerciseLog });
            }
          });
        });
      });
    });
  });

  exerciseList.forEach((exercise) => {
    const { exerciseKey } = exercise;
    console.log(listWithLogs.length);
  });
};

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

export const initWorkout = exerciseList => (dispatch) => {
  dispatch({
    type: INIT_WORKOUT,
    payload: exerciseList,
  });
};

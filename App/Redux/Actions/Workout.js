import firebase from 'react-native-firebase';
import { SET_REPS, SET_WEIGHT, GET_EXERCISE } from '../Types/Workout';

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

export const getPrograms = index => (dispatch) => {};

export const getExercise = index => (dispatch) => {
  dispatch({
    type: GET_EXERCISE,
    payload: index,
  });
};

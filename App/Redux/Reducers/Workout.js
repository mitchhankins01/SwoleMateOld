import { combineReducers } from 'redux';
import { SET_REPS, SET_WEIGHT, GET_EXERCISE } from '../Types/Workout';

const IS_EXERCISE = {
  empty: true,
};

const INITIAL_STATE = {
  reps: 0,
  weight: 0,
};

const exerciseReducer = (state = IS_EXERCISE, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_EXERCISE:
      return state;
  }
};

const inputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REPS: {
      return { ...state, reps: action.payload };
    }
    case SET_WEIGHT: {
      return { ...state, weight: action.payload };
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  input: inputReducer,
  exercise: exerciseReducer,
});

export default reducers;

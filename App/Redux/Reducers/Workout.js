import { combineReducers } from 'redux';
import {
  SET_REPS,
  SET_WEIGHT,
  INIT_WORKOUT,
  NEXT_EXERCISE,
  ON_PRESS_SAVE,
  HIDE_COUNTDOWN,
} from '../Types/Workout';

const IS_EXERCISE = {
  logs: [],
  exerciseList: [],
  initiated: false,
  showCountDown: false,
  workoutComplete: false,
  // Specific to current exercise
  sets: 2,
  name: '',
  reps: 10,
  rest: 60,
  exerciseKey: '',
  exerciseIndex: 0,
};

const INITIAL_STATE = {
  reps: 0,
  weight: 0,
  setIndex: 0,
  completedSets: [],
  completedExercises: [],
};

const exerciseReducer = (state = IS_EXERCISE, action) => {
  switch (action.type) {
    default:
      return state;
    case INIT_WORKOUT:
      return {
        ...state,
        initiated: true,
        logs: action.payload.logs,
        exerciseList: action.payload.exerciseList,

        name: action.payload.exerciseList[0].name,
        reps: action.payload.exerciseList[0].reps,
        rest: action.payload.exerciseList[0].rest,
        sets: action.payload.exerciseList[0].sets,
        exerciseIndex: action.payload.exerciseList[0].index,
        exerciseKey: action.payload.exerciseList[0].exerciseKey,
      };
    case NEXT_EXERCISE:
      if (state.exerciseIndex + 1 >= state.exerciseList.length) {
        return { ...IS_EXERCISE, workoutComplete: true };
      }
      return {
        ...state,
        name: state.exerciseList[action.payload.exerciseIndex].name,
        reps: state.exerciseList[action.payload.exerciseIndex].reps,
        rest: state.exerciseList[action.payload.exerciseIndex].rest,
        sets: state.exerciseList[action.payload.exerciseIndex].sets,
        exerciseIndex: state.exerciseList[action.payload.exerciseIndex].index,
        exerciseKey: state.exerciseList[action.payload.exerciseIndex].exerciseKey,
      };
    case ON_PRESS_SAVE:
      return { ...state, showCountDown: true };
    case HIDE_COUNTDOWN:
      return { ...state, showCountDown: false };
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
    case ON_PRESS_SAVE:
      return {
        ...state,
        setIndex: state.setIndex + 1,
        completedSets: [
          ...state.completedSets,
          { set: state.setIndex, reps: state.reps, weight: state.weight },
        ],
      };
    case NEXT_EXERCISE:
      return {
        ...INITIAL_STATE,
        completedExercises: [
          ...state.completedExercises,
          {
            completedSets: state.completedSets,
            exerciseKey: action.payload.exerciseKey,
          },
        ],
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  input: inputReducer,
  exercise: exerciseReducer,
});

export default reducers;

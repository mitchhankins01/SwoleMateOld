import { combineReducers } from 'redux';
import {
  SET_REPS,
  SET_WEIGHT,
  INIT_WORKOUT,
  NEXT_EXERCISE,
  ON_PRESS_SAVE,
  HIDE_COUNTDOWN,
  CHANGE_EXERCISE,
  DESTROY_WORKOUT,
} from '../Types/Workout';
import { destroyWorkout } from '../Actions/Workout';

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
  performed: [],
  startedAt: new Date(),
};

const exerciseReducer = (state = IS_EXERCISE, action) => {
  switch (action.type) {
    default:
      return state;
    case DESTROY_WORKOUT:
      return IS_EXERCISE;
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
    case CHANGE_EXERCISE:
      if (state.exerciseIndex + 1 >= state.exerciseList.length && action.type === NEXT_EXERCISE) {
        return { ...IS_EXERCISE, workoutComplete: true };
      }
      return {
        ...state,
        name: action.payload.name,
        reps: action.payload.reps,
        rest: action.payload.rest,
        sets: action.payload.sets,
        exerciseIndex: action.payload.index,
        exerciseKey: action.payload.exerciseKey,
      };
    case ON_PRESS_SAVE:
      return { ...state, showCountDown: true };
    case HIDE_COUNTDOWN:
      return { ...state, showCountDown: false };
  }
};

const inputReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DESTROY_WORKOUT:
      return INITIAL_STATE;
    case INIT_WORKOUT: {
      return { ...state, startedAt: new Date() };
    }
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
        performed: {
          ...state.performed,
          [action.payload]: {
            ...state.performed[action.payload],
            [state.setIndex]: { set: state.setIndex, reps: state.reps, weight: state.weight },
          },
        },
      };
    case CHANGE_EXERCISE:
      if (!state.performed[action.payload.exerciseKey]) return { ...state, setIndex: 0 };
      return {
        ...state,
        setIndex: Object.keys(state.performed[action.payload.exerciseKey]).length,
      };
    case NEXT_EXERCISE:
      return { ...INITIAL_STATE, performed: { ...state.performed }, startedAt: state.startedAt };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  input: inputReducer,
  exercise: exerciseReducer,
});

export default reducers;

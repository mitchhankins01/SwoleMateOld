import { combineReducers } from 'redux';
import { SET_REPS, SET_WEIGHT, INIT_WORKOUT, NEXT_EXERCISE, ON_PRESS_SAVE } from '../Types/Workout';

const IS_EXERCISE = {
  logs: [],
  exerciseList: [],
  initiated: false,
  // Specific to current exercise
  sets: 3,
  name: '',
  reps: 10,
  rest: 60,
  exerciseIndex: 0,
  exerciseKey: '',
};

const INITIAL_STATE = {
  reps: 0,
  weight: 0,
  setIndex: 0,
  completedSets: [],
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
      // Implement index
      return {
        ...state,
        name: state.exerciseList[state.exerciseIndex].name,
        reps: state.exerciseList[state.exerciseIndex].reps,
        rest: state.exerciseList[state.exerciseIndex].rest,
        sets: state.exerciseList[state.exerciseIndex].sets,
        exerciseIndex: state.exerciseList[state.exerciseIndex].index,
        exerciseKey: state.exerciseList[state.exerciseIndex].exerciseKey,
      };
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
    default:
      return state;
  }
};

export const reducers = combineReducers({
  input: inputReducer,
  exercise: exerciseReducer,
});

export default reducers;

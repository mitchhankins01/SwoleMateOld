import { SET_REPS, SET_WEIGHT } from '../Types/Workout';

const INITIAL_STATE = {
  reps: 0,
  weight: 0,
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
export { inputReducer };

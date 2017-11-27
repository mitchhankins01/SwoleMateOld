import {
  UPDATE_SCREEN_INDEX,
  FETCH_ALL_PROGRAMS_FAILURE,
  FETCH_ALL_PROGRAMS_SUCCESS,
} from '../actions/program_actions';

const INITIAL_STATE = {
  error: '',
  programs: [],
  screenIndex: 'primaryProgram',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SCREEN_INDEX:
      return { ...state, screenIndex: action.payload };
    case FETCH_ALL_PROGRAMS_SUCCESS:
      return { ...state, programs: action.payload };
    case FETCH_ALL_PROGRAMS_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later'
      };
    default:
      return state;
  }
};

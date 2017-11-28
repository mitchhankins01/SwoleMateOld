import {
  // Screen Index
  UPDATE_SCREEN_INDEX,
  // Fetch All Programs
  FETCH_ALL_PROGRAMS,
  FETCH_ALL_PROGRAMS_FAILURE,
  FETCH_ALL_PROGRAMS_SUCCESS,
  // Fetch Primary Program
  FETCH_PRIMARY_PROGRAM,
  FETCH_PRIMARY_PROGRAM_FAILURE,
  FETCH_PRIMARY_PROGRAM_SUCCESS,
} from '../actions/program_actions';

const INITIAL_STATE = {
  error: '',
  programs: [],
  loading: false,
  screenIndex: 'primaryProgram',
  // Primary Program
  info: [],
  days: [],
  exercises: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SCREEN_INDEX:
      return { ...state, screenIndex: action.payload };
    case FETCH_ALL_PROGRAMS:
      return { ...state, loading: true, error: '' };
    case FETCH_ALL_PROGRAMS_SUCCESS:
      return { ...state, programs: action.payload, error: '', loading: false };
    case FETCH_ALL_PROGRAMS_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };
    case FETCH_PRIMARY_PROGRAM:
      return { ...state, loading: true, error: '' };
    case FETCH_PRIMARY_PROGRAM_SUCCESS:
      return { ...state,
        error: '',
        info: action.info,
        days: action.days,
        exercises: action.exercises,
        loading: false };
    case FETCH_PRIMARY_PROGRAM_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };
    default:
      return state;
  }
};

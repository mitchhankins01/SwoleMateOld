import {
  // Screen Index
  UPDATE_SCREEN_INDEX,
  // Fetch All Programs
  FETCH_ALL_PROGRAMS,
  FETCH_ALL_PROGRAMS_FAILURE,
  FETCH_ALL_PROGRAMS_SUCCESS,
  // Fetch Primary Program
  FETCH_PROGRAM,
  FETCH_PROGRAM_FAILURE,
  FETCH_PROGRAM_SUCCESS,
  // Add New Programs
  ADD_NEW_PROGRAM,
  ADD_NEW_PROGRAM_FAILURE,
} from '../actions/program_actions';

const INITIAL_STATE = {
  error: '',
  programs: [],
  loading: false,
  screenIndex: 'primaryProgram',
  // Program
  info: [],
  days: [],
  exercises: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Screen Index
    case UPDATE_SCREEN_INDEX:
      return { ...state, screenIndex: action.payload };

    // All Programs
    case FETCH_ALL_PROGRAMS:
      return { ...state, loading: true, error: '' };
    case FETCH_ALL_PROGRAMS_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };
    case FETCH_ALL_PROGRAMS_SUCCESS:
      return { ...state, programs: action.payload, error: '', loading: false };

    // Selected or Primary Program
    case FETCH_PROGRAM:
      return { ...state, loading: true, error: '' };
    case FETCH_PROGRAM_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };
    case FETCH_PROGRAM_SUCCESS:
      return { ...state,
        error: '',
        info: action.info,
        days: action.days,
        exercises: action.exercises,
        loading: false };

    // Add new Program
    case ADD_NEW_PROGRAM:
      return { ...state, error: '', screenIndex: 'allPrograms' };
    case ADD_NEW_PROGRAM_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };

    default:
      return state;
  }
};

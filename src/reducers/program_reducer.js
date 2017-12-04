import {
  // Various
  UPDATE_SCREEN_INDEX,
  UPDATE_SELECTED_DAY_KEY,
  // Fetch All Programs
  FETCH_ALL_PROGRAMS,
  FETCH_ALL_PROGRAMS_FAILURE,
  FETCH_ALL_PROGRAMS_SUCCESS,
  // Fetch All Exercises
  FETCH_ALL_EXERCISES,
  FETCH_ALL_EXERCISES_FAILURE,
  FETCH_ALL_EXERCISES_SUCCESS,
  // Fetch Primary Program
  FETCH_PROGRAM,
  FETCH_PROGRAM_FAILURE,
  FETCH_PROGRAM_SUCCESS,
  // Add New Programs
  ADD_PROGRAM,
  ADD_PROGRAM_FAILURE,
  // Add New Program Day
  ADD_PROGRAM_DAY,
  ADD_PROGRAM_DAY_FAILURE,
  // Add New Program Exercise
  ADD_PROGRAM_EXERCISE,
  ADD_PROGRAM_EXERCISE_FAILURE,
} from '../actions/program_actions';

const INITIAL_STATE = {
  error: '',
  programs: [],
  exercises: [],
  loading: false,
  selectedDayKey: '',
  screenIndex: 'primaryProgram',
  // Program
  info: [],
  days: [],
  allExercises: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Various
    case UPDATE_SCREEN_INDEX:
      return { ...state, screenIndex: action.payload };
    case UPDATE_SELECTED_DAY_KEY:
      return { ...state, selectedDayKey: action.payload };

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

    // All Exercises
    // IMPLEMENT, spinner on form screen for loading
    case FETCH_ALL_EXERCISES:
      return { ...state, loading: true, error: '' };
    case FETCH_ALL_EXERCISES_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
        loading: false
      };
    case FETCH_ALL_EXERCISES_SUCCESS:
      return { ...state, allExercises: action.payload, error: '', loading: false };

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
    case ADD_PROGRAM:
      return { ...state, error: '', screenIndex: 'allPrograms' };
    case ADD_PROGRAM_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
      };

    // Add New Program Day
    case ADD_PROGRAM_DAY:
      return { ...state, error: '', screenIndex: 'primaryProgram' };
    case ADD_PROGRAM_DAY_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
      };

    // Add New Program Exercise
    case ADD_PROGRAM_EXERCISE:
      return { ...state, error: '', screenIndex: 'programExercises' };
    case ADD_PROGRAM_EXERCISE_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
      };

    default:
      return state;
  }
};

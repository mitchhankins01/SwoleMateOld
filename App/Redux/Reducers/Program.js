import {
  TOGGLE_EXERCISES,
  GET_PROGRAM,
  GET_PROGRAMS,
  GET_PROGRAM_FAIL,
  GET_PROGRAMS_FAIL,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAMS_SUCCESS,
} from '../Types/Program';

const INITIAL_STATE = {
  info: [],
  days: [],
  error: '',
  dayKey: '',
  exercises: [],
  loading: false,
  showExercises: false,
};

const INITIAL_STATE_2 = {
  error: '',
  programs: [],
  loading: false,
  allExercises: [],
};

const programReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_EXERCISES: {
      return {
        ...state,
        dayKey: action.payload.dayKey,
        showExercises: action.payload.bool,
      };
    }
    case GET_PROGRAM:
      return { ...state, loading: true, error: '' };
    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        info: action.payload.info,
        days: action.payload.days,
        exercises: action.payload.exercises,
      };
    case GET_PROGRAM_FAIL:
      return {
        ...state,
        programs: '',
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const programsReducer = (state = INITIAL_STATE_2, action) => {
  switch (action.type) {
    case GET_PROGRAMS:
      return { ...state, loading: true, error: '' };
    case GET_PROGRAMS_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        programs: action.payload.programs,
        allExercises: action.payload.allExercises,
      };
    case GET_PROGRAMS_FAIL:
      return {
        ...state,
        programs: '',
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { programReducer, programsReducer };

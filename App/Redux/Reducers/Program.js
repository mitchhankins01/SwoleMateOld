import {
  GET_PROGRAM,
  GET_PROGRAMS,
  GET_PROGRAM_FAIL,
  GET_PROGRAMS_FAIL,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAMS_SUCCESS,
} from '../Types/Program';

const INITIAL_STATE = {
  error: '',
  programs: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROGRAMS:
      return { ...state, loading: true, error: '' };
    case GET_PROGRAMS_SUCCESS:
      return { ...state, ...INITIAL_STATE, programs: action.payload };
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

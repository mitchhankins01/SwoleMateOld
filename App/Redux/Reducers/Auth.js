import { RESET_AUTH, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../Types/Auth';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_AUTH:
      return INITIAL_STATE;
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        password: '',
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

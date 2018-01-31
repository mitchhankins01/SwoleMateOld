import { RESET_AUTH, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from '../Types/Auth';

const INITIAL_STATE = {
  error: '',
  user: null,
  imperial: true,
  loading: false,
  name: 'SwoleMate',
  theme: 'standard',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_AUTH:
      return INITIAL_STATE;
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...INITIAL_STATE,
        user: action.payload.user,
        name: action.payload.name,
        theme: action.payload.theme,
        imperial: action.payload.imperial,
      };
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

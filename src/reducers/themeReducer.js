import {
  FETCH_THEME,
  FETCH_THEME_FAILURE,
  FETCH_THEME_SUCCESS,
  CHANGE_THEME,
  CHANGE_THEME_FAILURE,
  CHANGE_THEME_SUCCESS,
} from '../actions/themeActions';

const INITIAL_STATE = {
  error: '',
  selected: 'standard',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_THEME:
      return { ...state, error: '' };
    case FETCH_THEME_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
      };
    case FETCH_THEME_SUCCESS:
      return { ...state, selected: action.payload, error: '' };

    case CHANGE_THEME:
      return { ...state, error: '' };
    case CHANGE_THEME_FAILURE:
      return { ...state,
        error: action.payload.message
        || 'An error occured, please try again later',
      };
    case CHANGE_THEME_SUCCESS:
      return { ...state, selected: action.payload, error: '' };
    default:
      return state;
  }
};

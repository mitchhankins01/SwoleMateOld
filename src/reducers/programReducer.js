import {
  // Various
  UPDATE_SCREEN_INDEX,
  UPDATE_SELECTED_DAY_KEY,
} from '../actions/programActions';

const INITIAL_STATE = {
  selectedDayKey: '',
  screenIndex: 'primaryProgram',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Various
    case UPDATE_SCREEN_INDEX:
      return { ...state, screenIndex: action.payload };
    case UPDATE_SELECTED_DAY_KEY:
      return { ...state, selectedDayKey: action.payload };
    default:
      return state;
  }
};

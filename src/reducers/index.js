import { combineReducers } from 'redux';

import theme from './themeReducer';
import program from './program_reducer';

export default combineReducers({
  theme, program,
});

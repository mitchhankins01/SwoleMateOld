import { combineReducers } from 'redux';

import theme from './themeReducer';
import program from './programReducer';

export default combineReducers({
  theme, program
});

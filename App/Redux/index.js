import { combineReducers } from 'redux';
import configureStore from './CreateStore';

import Workout from './Reducers/Workout';
import AuthReducer from './Reducers/Auth';
import * as Program from './Reducers/Program';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  workout: Workout,
  auth: AuthReducer,
  program: Program.programReducer,
  programs: Program.programsReducer,
  nav: require('./Reducers/Navigation').reducer,
});

export default () => {
  const { store } = configureStore(reducers);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

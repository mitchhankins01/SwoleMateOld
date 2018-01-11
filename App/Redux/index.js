import { combineReducers } from 'redux';
import configureStore from './CreateStore';

import AuthReducer from './Reducers/Auth';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./Reducers/Navigation').reducer,
  auth: AuthReducer,
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

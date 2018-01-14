import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';

export default (rootReducer) => {
  const store = createStore(rootReducer, applyMiddleware(logger, thunk, promiseMiddleware));

  return {
    store,
  };
};

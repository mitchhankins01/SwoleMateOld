import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';

export default (rootReducer) => {
  const store = compose(applyMiddleware(thunk, logger))(createStore)(rootReducer);
  return {
    store,
  };
};

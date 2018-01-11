import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

export default (rootReducer) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger)
  )

  return {
    store,
  }
}

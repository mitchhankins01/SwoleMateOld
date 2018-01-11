import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default (rootReducer) => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
  )
  
  return {
    store,
  }
}

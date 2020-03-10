import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';

import ReduxThunk from 'redux-thunk';
// import axios from 'axios';

import appReducer from './appReducer';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.groupEnd();
  return result;
};

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk, logger))(
  createStore,
);

const rootReducer = combineReducers({
  app: appReducer,
});

function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

const store = module.hot
  ? configureStore(window.__REDUX_STATE__ || {})
  : configureStore({});

export { configureStore, store };

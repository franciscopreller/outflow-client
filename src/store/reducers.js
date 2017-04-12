import { combineReducers } from 'redux';
import locationReducer from './location';

// Custom global reducers
import authReducer from '../modules/auth/reducers';
import sessionReducer from '../modules/session/reducers';
import connectionReducer from '../modules/connection/reducers';
import contentReducer from '../modules/content/reducers';
import commandReducer from '../modules/command/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authReducer,
    sessions: sessionReducer,
    connections: connectionReducer,
    content: contentReducer,
    command: commandReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

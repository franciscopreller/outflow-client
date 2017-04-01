import { combineReducers } from 'redux';
import locationReducer from './location';

// Custom global reducers
import sessionReducer from '../modules/session/reducers';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    session: sessionReducer,
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

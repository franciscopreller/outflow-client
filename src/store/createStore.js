import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import WebSocket from 'ws';
import { updateLocation } from './location';
import createWSMiddleware from '../middleware/ws';

export default (initialState = {}) => {
  const ws = new WebSocket('ws://outflow.local/ws');
  const wsMiddleware = createWSMiddleware(ws, '@@ws');
  ws.on('open', function open() {
    ws.send('something');
  });

  // Middleware Configuration
  const middleware = [thunk, wsMiddleware];

  // Store Enhancers
  const enhancers = [autoRehydrate()];

  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // Store Instantiation and HMR Setup
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  persistStore(store);
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
}

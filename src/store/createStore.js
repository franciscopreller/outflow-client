import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import WebSocket from 'socketcluster-client';
import { updateLocation } from './location';
import createWSMiddleware from '../middleware/ws';

export default (initialState = {}) => {
  const ws = WebSocket.connect({
    hostname: 'outflow.local',
    port: 80,
    path: '/ws',
    autoreconnect: true,
  });
  const wsMiddleware = createWSMiddleware(ws, '@@ws');
  ws.on('connect', () => {
    console.log('Connected to server');
  });
  ws.on('error', (err) => {
    console.log('Error connecting to socket server', err);
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

import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import { updateLocation } from './location';
import createWSMiddleware from '../modules/ws/middleware';
import { WS_PREFIX } from '../modules/ws/constants';
import rootSaga from './sagas';

// Set the websocket options
const webSocketOptions = {
  hostname: 'outflow.local',
  port: 80,
  path: '/ws',
  autoreconnect: true,
  perMessageDeflate: true,
};

export default (initialState = {}) => {
  const wsMiddleware = createWSMiddleware(WS_PREFIX, webSocketOptions);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [wsMiddleware, sagaMiddleware];
  const enhancers = [autoRehydrate()];
  let composeEnhancers = compose;

  // Load redux dev tools
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
  sagaMiddleware.run(rootSaga);

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

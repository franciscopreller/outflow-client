import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import { updateLocation } from './location';
import createWSMiddleware from '../middleware/ws';
import { WS_PREFIX } from '../middleware/ws/constants';
import rootSaga from './sagas';

export default (initialState = {}) => {
  const wsMiddleware = createWSMiddleware(WS_PREFIX, {
    hostname: 'outflow.local',
    port: 80,
    path: '/ws',
    autoreconnect: true,
    perMessageDeflate: true,
  });
  const sagaMiddleware = createSagaMiddleware();

  // Middleware Configuration
  const middleware = [wsMiddleware, sagaMiddleware];

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

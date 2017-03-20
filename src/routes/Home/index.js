import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default;
      const connectionReducer = require('./modules/connection').default;

      // Inject reducers
      injectReducer(store, { key: 'connection', reducer: connectionReducer });

      // Invoke callback
      cb(null, Home);
    }, 'home');
  }
});

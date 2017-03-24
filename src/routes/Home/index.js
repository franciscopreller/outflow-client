import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default;

      // @TODO: Inject this in global scope
      const connectionReducer = require('../../modules/connection/reducers').default;

      // Inject reducers
      injectReducer(store, { key: 'connection', reducer: connectionReducer });

      // Invoke callback
      cb(null, Home);
    }, 'home');
  }
});

import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default;

      // @TODO: Inject this in global scope
      const sessionReducer = require('../../modules/session/reducers').default;

      // Inject reducers
      injectReducer(store, { key: 'session', reducer: sessionReducer });

      // Invoke callback
      cb(null, Home);
    }, 'home');
  }
});

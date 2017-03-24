import { connect } from 'react-redux';
import Home from '../components/HomeView';
import { removeConnection } from '../../../modules/connection/actions';

const mapDispatchToProps = {
  removeConnection
};

const mapStateToProps = (state) => ({
  connections: state.connection.connections
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

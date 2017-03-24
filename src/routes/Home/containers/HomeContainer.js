import { connect } from 'react-redux';
import Home from '../components/HomeView';
import { closeConnection } from '../../../modules/connection/actions';

const mapDispatchToProps = {
  closeConnection
};

const mapStateToProps = (state) => ({
  connections: state.connection.connections
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

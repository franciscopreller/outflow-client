import { connect } from 'react-redux';
import Home from '../components/HomeView';
import { closeSession } from '../../../modules/connection/actions';

const mapDispatchToProps = {
  closeSession
};

const mapStateToProps = (state) => ({
  sessions: state.connection.sessions
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

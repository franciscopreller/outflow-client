import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { closeSession, sendCommand } from '../modules/session/actions';

const mapDispatchToProps = ({
  closeSession,
  sendCommand,
});

const mapStateToProps = (state) => ({
  connections: state.session.connections,
  content: state.session.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

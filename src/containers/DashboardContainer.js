import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { closeSession, sendCommand } from '../modules/session/actions';

const mapDispatchToProps = ({
  closeSession,
  sendCommand,
});

const mapStateToProps = (state) => ({
  connections: state.connections,
  content: state.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

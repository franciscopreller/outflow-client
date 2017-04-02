import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { closeSession, sendCommand } from '../modules/session/actions';

const mapDispatchToProps = ({
  closeSession,
  sendCommand,
});

const mapStateToProps = (state) => ({
  sessions: state.sessions.map((session) => Object.assign({}, session, {
    connection: state.connections.find((conn) => conn.uuid === session.uuid),
    content: state.content.find((content) => content.uuid === session.uuid),
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

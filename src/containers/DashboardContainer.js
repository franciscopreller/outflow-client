import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { closeSession, processCommand } from '../modules/session/actions';

const mapDispatchToProps = ({
  closeSession,
  processCommand,
});

const mapStateToProps = (state) => ({
  sessions: state.sessions.map((session) => Object.assign({}, session, {
    connection: state.connections.find((conn) => conn.uuid === session.uuid),
    content: state.content.find((content) => content.uuid === session.uuid),
    command: state.command.find((command) => command.uuid === session.uuid),
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

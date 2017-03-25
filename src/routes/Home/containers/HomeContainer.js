import { connect } from 'react-redux';
import Home from '../components/HomeView';
import { closeSession } from '../../../modules/session/actions';

const mapDispatchToProps = {
  closeSession
};

const mapStateToProps = (state) => ({
  connections: state.session.connections,
  content: state.session.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

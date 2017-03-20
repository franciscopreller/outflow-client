import { connect } from 'react-redux';
import Home from '../components/HomeView';

// const mapDispatchToProps = {
//   increment : () => increment(1),
//   doubleAsync
// };

const mapStateToProps = (state) => ({
  connections: state.connection.connections
});

export default connect(mapStateToProps)(Home);

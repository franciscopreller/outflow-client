import { connect } from 'react-redux';
import Header from '../components/Header';

// const mapDispatchToProps = ({
//   actions: {
//     closeSession,
//     sendCommand,
//   },
// });

const mapStateToProps = (state) => ({
  auth: {},
});

export default connect(mapStateToProps)(Header);

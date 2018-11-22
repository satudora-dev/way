import Logout from '../components/Logout';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapDispatchToProps = {
  signOut: actions.signOut,
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);

import Login from '../components/Login';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapDispatchToProps = {
  loginWithGithub: actions.loginWithGithub,
}

export default connect(null,mapDispatchToProps)(Login);

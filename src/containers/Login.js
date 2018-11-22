import Login from '../components/Login';
import { connect } from 'react-redux';

import { loginWithGithub }from '../actions/login';

const mapDispatchToProps = {
  loginWithGithub: loginWithGithub,
}

export default connect(null,mapDispatchToProps)(Login);

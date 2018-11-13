import Signup from '../components/Signup';
import { connect } from 'react-redux';

import { signUpAsUser } from '../actions/signup';

const mapStateToProps = state => {
  const ownKey = state.auth.ownKey;
  return {
    ownKey: ownKey,
    hasOwnProfile: state.users[ownKey] !== undefined,
  }
}

const mapDispatchToProps = {
  signUpAsUser: signUpAsUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);

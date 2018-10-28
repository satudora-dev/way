import Signup from '../components/Signup';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = state => {
  const ownKey = state.auth.ownKey;
  return {
    ownKey: ownKey,
    hasOwnProfile: state.users[ownKey] !== undefined,
  }
}

const mapDispatchToProps = {
  signUpAsUser: actions.signUpAsUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);

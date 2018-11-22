import Signup from '../components/Signup';
import { connect } from 'react-redux';

import { signUpAsUser } from '../actions/signup';

const mapStateToProps = state => {
  const currentUserID = state.auth.currentUserID;
  return {
    currentUserID: currentUserID,
    hasOwnProfile: state.users[currentUserID] !== undefined,
  }
}

const mapDispatchToProps = {
  signUpAsUser: signUpAsUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);

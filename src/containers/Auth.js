import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Auth extends React.Component {

  componentWillMount(){
    this.props.initFetchIfLoggedIn()
  }
  render() {
    return null;
  }
}

const mapStateToProps = ( {auth, users} ) => {
  const ownKey = auth.ownKey;
  return {
    ownKey: ownKey,
    hasOwnProfile: users[ownKey] !== undefined,
  }
}


const mapDispatchToProps = {
  initFetchIfLoggedIn: actions.initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

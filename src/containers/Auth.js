import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Auth extends Component {

  componentWillMount(){
    this.props.initFetchIfLoggedIn()
  }
  render() {
    return null;
  }
}

const mapStateToProps = ( state ) => {
  const ownkey = state.auth.ownkey;
  return {
    ownkey: ownkey,
    hasOwnProfile: state.users[ownkey] !== undefined,
  }
}


const mapDispatchToProps = {
  initFetchIfLoggedIn: actions.initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

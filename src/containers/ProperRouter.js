import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ProperRouter extends React.Component {

  render() {
    if(this.props.match.params.currentPath !== 'users'){
      this.props.history.push("/users");
    }
    return null;
  }
}

const mapStateToProps = ( {auth, users}, ownProps ) => {
  const currentUserID = auth.currentUserID;
  if(!users.init){
    return {
      currentUserID: currentUserID,
      hasOwnProfile: users[currentUserID] !== undefined,
      currentPath: ownProps.match.params.currentPath
    }
  }
  else{
    return {
      currentUserID: currentUserID,
      hasOwnProfile: true,
      currentPath: ownProps.match.params.currentPath
    }
  }
}


export default connect(
  mapStateToProps,
  null
)(ProperRouter);

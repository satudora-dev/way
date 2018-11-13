import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthRouter extends React.Component {
  redirect(currentUserID,hasOwnProfile, currentPath){
    if(currentUserID){
       if(hasOwnProfile){
           if(currentPath !== 'users'){
               this.props.history.push("/users");
           }
       }else{
         if(currentPath !== 'signup'){
             this.props.history.push("/signup");
         }
       }
     }else{
      if(currentPath !== 'login'){
         this.props.history.push("/login");
      }
    }
  }

  render() {
    this.redirect(this.props.currentUserID, this.props.hasOwnProfile, this.props.currentPath)
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
)(AuthRouter);

import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class AuthRouter extends React.Component {
  redirect(ownKey,hasOwnProfile, currentPath){
    if(ownKey){
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
    this.redirect(this.props.ownKey, this.props.hasOwnProfile, this.props.currentPath)
    return null;
  }
}

const mapStateToProps = ( {auth, users}, ownProps ) => {
  const ownKey = auth.ownKey;
  if(!users.init){
    return {
      ownKey: ownKey,
      hasOwnProfile: users[ownKey] !== undefined,
      currentPath: ownProps.match.params.currentPath
    }
  }
  else{
    return {
      ownKey: ownKey,
      hasOwnProfile: true,
      currentPath: ownProps.match.params.currentPath
    }
  }
}


export default connect(
  mapStateToProps,
  null
)(AuthRouter);

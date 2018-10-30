import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Routing extends React.Component {
  redirect(){
    if(this.props.ownKey){
      if(this.props.hasOwnProfile === true && (this.props.currentPath === 'login' || this.props.currentPath === 'signup')){
          this.props.history.push("/users");
      }else if(this.props.hasOwnProfile === false && this.props.currentPath !== 'signup') {
          this.props.history.push("/signup");
      }
      else{
        return;
      }
    }else if (this.props.ownKey === null && this.props.currentPath !== 'login'){
      this.props.history.push("/login");
    }
    else{
      return;
    }
  }
  render() {
    this.redirect()
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
)(Routing);

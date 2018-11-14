import React from 'react';
import { connect } from 'react-redux';
import { initFetchIfLoggedIn } from '../actions/fetch';
import Login from './Login';
import Signup from './Signup';
import CircularProgress from '@material-ui/core/CircularProgress';

class Auth extends React.Component {
  componentWillMount(){
    this.props.initFetchIfLoggedIn();
  }

  render() {
    if(!this.props.currentUserID){
      return <CircularProgress />;
    }else if(this.props.currentUserID === "NONE"){
      return <Login />;
    }else{
      if(this.props.users.noData){
        return <CircularProgress />;
      }else if (!this.props.hasOwnProfile){
        return <Signup />
      }else{
        return this.props.children;
      }
    }
  }
}

const mapStateToProps = ( {auth, users}, ownProps ) => {
  const currentUserID = auth.currentUserID;
  return {
    users: users,
    currentUserID: currentUserID,
    hasOwnProfile: users[currentUserID] || false,
  }
}


const mapDispatchToProps = {
  initFetchIfLoggedIn: initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

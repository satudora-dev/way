import React from 'react';
import { connect } from 'react-redux';
import { checkUserAuth } from '../actions/auth';
import { fetchUsers } from '../actions/users';
import Login from './Login';
import Signup from './Signup';
import CircularProgress from '@material-ui/core/CircularProgress';

class Auth extends React.Component {
  componentWillMount(){
    this.props.checkUserAuth();
  }

  render() {
    if(this.props.currentUserID === undefined){
      return <CircularProgress />;
    }else if(this.props.currentUserID === null){
      return <Login />;
    }else{
      if(this.props.users.noData){
        this.props.fetchUsers()
        return <CircularProgress />;
      }else if (!this.props.hasOwnProfile){
        return <Signup />
      }else{
        return this.props.children;
      }
    }
  }
}

const mapStateToProps = ( {auth, users}) => {
  const currentUserID = auth.currentUserID;
  return {
    users: users,
    currentUserID: currentUserID,
    hasOwnProfile: users[currentUserID] || false,
  }
}


const mapDispatchToProps = {
  fetchUsers: fetchUsers,
  checkUserAuth: checkUserAuth
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

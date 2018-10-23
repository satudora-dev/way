import React, { Component } from 'react';
import { connect } from 'react-redux';
import {firebaseAuth} from '../firebase';

import * as actions from '../actions';

class Auth extends Component {

  constructor(props) {
    super(props);
    if(this.props.registered === false) this.props.history.push('/signup')
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        this.props.fetchAccounts();
        this.props.fetchPositions();
        this.props.fetchProjects();
        this.props.fetchTags();
        this.props.fetchUsers();
        this.props.loginAsUser(user.email);
      }else{
        this.props.loginAsUser(null);
        this.props.history.push('/login')
      }
    })

  }
  render() {
    return null;
  }
}
const mapStateToProps = ( state ) => {
  const userkey = state.auth.CurrentUserKey;
  if(userkey){
    return{
      registered: state.accounts[userkey].registered
    }
  }
}

export default connect(mapStateToProps,{
  fetchAccounts: actions.fetchAccounts,
  fetchPositions: actions.fetchPositions,
  fetchProjects: actions.fetchProjects,
  fetchTags: actions.fetchTags,
  fetchUsers: actions.fetchUsers,
  loginAsUser: actions.loginAsUser
})(Auth);

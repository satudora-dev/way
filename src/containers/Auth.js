import React, { Component } from 'react';
import { connect } from 'react-redux';
import {firebaseAuth} from '../firebase';

import * as actions from '../actions';

class Auth extends Component {
  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        this.props.fetchAccounts();
        this.props.fetchPositions();
        this.props.fetchProjects();
        this.props.fetchTags();
        this.props.fetchUsers();
        this.props.loginAsUser(user.email);
        this.props.history.push('/users');
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

export default connect(null,actions)(Auth);

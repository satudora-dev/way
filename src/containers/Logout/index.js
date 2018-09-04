import React, { Component } from 'react';
import {firebaseAuth} from '../../firebase';
import {withRouter} from 'react-router-dom';

class Logout extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){    
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        firebaseAuth().signOut().then(()=>{
          this.props.history.push('/login');
        });
      }
      else{
        this.props.history.push('/login');
      }
    });
  }

  render(){
    return null;
  }
}

export default withRouter(Logout);

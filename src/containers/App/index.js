import React, { Component } from 'react';
import {firebaseAuth} from '../../firebase';
import {withRouter} from 'react-router-dom';

class App extends Component {
  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        this.props.history.push('/signup');
      }
      else{
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Now Loading ...</h2>
      </div>
    );
  }
}

export default withRouter(App);

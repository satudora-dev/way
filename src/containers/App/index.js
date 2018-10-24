import React, { Component } from 'react';
import {firebaseAuth} from '../../firebase';

class App extends Component {
  componentWillMount(){
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <h2>Now Loading ...</h2>
      </div>
    );
  }
}

export default App;

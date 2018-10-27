import React from 'react';
import {firebaseAuth} from '../../firebase';

class App extends React.Component {
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

export default App;

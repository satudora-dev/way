import React from 'react';

class Logout extends React.Component {
  render(){
    return <button onClick={() => this.props.signOut()}>LOGOUT</button>;
  }
}

export default Logout;

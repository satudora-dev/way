import React from 'react';

class Logout extends React.Component {
  render(){
    return <button onClick={() => {
      this.props.signOut();
      this.props.history.push("");
    }}>LOGOUT</button>;
  }
}

export default Logout;

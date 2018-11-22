import React from 'react';

class Logout extends React.Component {
  componentWillMount(){
    this.props.signOut();
    this.props.history.push("");
  }
  render(){
    return null;
  }
}

export default Logout;

import React from 'react';

class Logout extends React.Component {

  componentWillMount(){
    this.props.signOut()
  }
  render(){
    return null;
  }
}

export default Logout;

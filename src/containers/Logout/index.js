import React from 'react';
import * as actions from '../../actions'
import { connect } from 'react-redux';

class Logout extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.signOut()
    this.props.history.push("/login")
  }
  render(){
    return null;
  }
}

const mapDispatchToProps = {
  signOut: actions.signOut,
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);

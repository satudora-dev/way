import React from 'react';
import { connect } from 'react-redux';


class ProperRouter extends React.Component {

  render() {
    const currentPath = this.props.match.params.currentPath;
    if( currentPath === undefined ){
      this.props.history.push("/users");
    }
    return null;
  }
}




export default connect()(ProperRouter);

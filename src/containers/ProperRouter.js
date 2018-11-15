import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ProperRouter extends React.Component {

  render() {
    const currentPath = this.props.match.params.currentPath;
    if( (currentPath !== 'users' && currentPath !== 'logout') || currentPath === undefined ){
      this.props.history.push("/users");
    }
    return null;
  }
}




export default connect()(ProperRouter);

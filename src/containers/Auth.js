import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Auth extends React.Component {
  componentWillMount(){
    this.props.initFetchIfLoggedIn()
  }

  render() {
    if(!this.props.auth.init && !this.props.users.init){
      return this.props.children;
    }else{
      return <h1>Now Loading....</h1>;
    }
  }
}

const mapStateToProps = ( {auth, users}, ownProps ) => {
    return {
      auth: auth,
  }
}


const mapDispatchToProps = {
  initFetchIfLoggedIn: actions.initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

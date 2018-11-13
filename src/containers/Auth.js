import React from 'react';
import { connect } from 'react-redux';
import { initFetchIfLoggedIn } from '../actions/fetch';
import Login from './Login'

class Auth extends React.Component {
  componentWillMount(){
    this.props.initFetchIfLoggedIn()
  }

  render() {
    // Each Reducer have initial state, {noData: true}
    if(this.props.auth.noData){
      return <h1>Now loading...</h1>;
    }else if(this.props.auth.currentUserID === null){
      return <Login />;
    }else{
      return this.props.children;
    }
  }
}

const mapStateToProps = ( {auth, users}, ownProps ) => {
    return {
      auth: auth,
      users: users
  }
}


const mapDispatchToProps = {
  initFetchIfLoggedIn: initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

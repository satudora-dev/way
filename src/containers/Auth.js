import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './Login'
class Auth extends React.Component {
  componentWillMount(){
    this.props.initFetchIfLoggedIn()
  }

  render() {
    if(!this.props.auth.noData){
      if(!this.props.users.noData){
        return this.props.children;
      }else{
        return(
        <BrowserRouter>
          <Route path="/:currentPath?" component={ Login } />
        </BrowserRouter>
        )
      }
    }else{
      return <h1>Now loading...</h1>
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
  initFetchIfLoggedIn: actions.initFetchIfLoggedIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

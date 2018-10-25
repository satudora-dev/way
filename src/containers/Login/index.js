import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import GithubButton from './GithubButton'
import SiteInfo from '../../components/SiteInfo';

import { connect } from 'react-redux';
import * as actions from '../../actions'

class Login extends Component {


  loginAndJump = () => {
    this.props.loginWithGithub()
  }

  render() {
    const style = {
      container: {
        "padding-top": "80px",
        "padding-bottom": "100px",
        width: "100%",
        "text-align": "center",
        position: "relative",
      }
    }
    if(this.props.ownkey && this.props.hasOwnProfile) this.props.history.push('./users')
    else if (this.props.ownkey && this.props.hasOwnProfile ===　false ) this.props.history.push('./signup')
    return (
      <div className="Login">
        <div style={style.container }>
          <SiteInfo/>
        </div>
        <GithubButton onClick={this.loginAndJump}/>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  const ownkey = state.auth.ownkey;
  return {
    ownkey: ownkey,
    hasOwnProfile: state.users[ownkey] !== undefined,
  }
}

const mapDispatchToProps = {
  loginWithGithub: actions.loginWithGithub,
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

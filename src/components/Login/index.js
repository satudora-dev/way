import React, { Component } from 'react';
import SiteInfo from '../../components/SiteInfo';
import styled from 'styled-components';


const Icon = styled.div `
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 auto;
  transition:  1s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    background-color: #D7D7D7;
    transform: translateY(-5px);
  }
`


const Logo = styled.div `
  padding-top: 80px;
  padding-bottom: 100px;
  width: 100%;
  text-align: center;
`


function GithubButton(props){
  return(
    <div>
      <Icon onClick={props.onClick}>
        <img src="./github.svg" alt="failed loading a github icon."/>
      </Icon>
      <h3>Login with GitHub</h3>
    </div>
  );
}

class Login extends Component {

  render() {
    return (
      <div className="Login">
        <Logo>
          <SiteInfo/>
        </Logo>
        <GithubButton
          onClick={() => {
            this.props.loginWithGithub();
          }}/>
      </div>
    );
  }
}

export default Login;

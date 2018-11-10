import React, { Component } from 'react';
import SiteInfo from '../../components/SiteInfo';
import styled from 'styled-components'


const Github = styled.div `
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 auto;
  transition:  1s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    border: none;
    background-color: #BDBDBD;
    transform: translateY(-5px);
  }
`

const Button = styled.div `
  border: none;
  background-color: white;
`

const Container = styled.div `
  padding-top: 80px;
  padding-bottom: 100px;
  width: 100%;
  text-align: center;
  position: relative;
`


function GithubButton(props){
  return(
        <Button onClick={props.onClick}>
          <Github>
            <img src="./github.svg" />
          </Github>
          <h3>Login with GitHub</h3>
        </Button>
  );
}

class Login extends Component {

  render() {
    return (
      <div className="Login">
        <Container>
          <SiteInfo/>
        </Container>
        <GithubButton
          onClick={() => {
            this.props.loginWithGithub();
          }}/>
      </div>
    );
  }
}

export default Login;

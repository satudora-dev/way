import React, { Component } from 'react';
import "./login.css";
import SiteInfo from '../../components/SiteInfo';



function GithubButton(props){
  const style = {
    github:{
      width: "80px",
      height: "80px",
      "border-radius": "50%",
      padding: 0,
      transition: "all .3s",
    },
    button: {
      padding: 0,
      border: "none",
      cursor: "pointer",
      "background-color": "white",
      transition: "all .3s",
    }
  }
  return(
    <div>
        <button onClick={props.onClick} className="github" style={style.button}>
          <img className="github" style={style.github} src="./github.svg" />
          <h3>LOGIN</h3>
        </button>

    </div>
  );
}

class Login extends Component {

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
    return (
      <div className="Login">
        <div style={style.container }>
          <SiteInfo/>
        </div>
        <GithubButton
          onClick={() => {
            this.props.loginWithGithub();
          }}/>
      </div>
    );
  }
}

export default Login;

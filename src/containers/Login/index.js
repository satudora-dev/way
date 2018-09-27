import React, { Component } from 'react';
import {firebaseDB,firebaseAuth} from '../../firebase';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRouter} from 'react-router-dom';
import "./login.css";
import SiteInfo from '../../components/SiteInfo';

const ref = firebaseDB.ref('accounts');

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
  constructor(props){
    super(props);
  }

  redirect(path,refKey){
    this.props.history.push({
      pathname: path,
    });
  }

  handleLogin(){//ポップアップログイン後にsignupに遷移
    const provider=new firebaseAuth.GithubAuthProvider();
    firebaseAuth().signInWithPopup(provider).then(result=>{
      if(result.credential!=null){
        var idRef;
        ref.orderByChild('email').equalTo(result.user.email)//メールアドレスが既に登録されているか
          .once('value',(snapshot)=>{
            if(snapshot.val()==null){//初回ログイン時
              idRef=ref.push();
              idRef.set({
                email: result.user.email,
                token: result.credential.accessToken,
                registered: false,
              }).then((result)=>{
                this.redirect('/signup',idRef);
              });
            }
            else{
              this.redirect('/signup',idRef);
            }
        });
      }
    });
  }

  render() {
    const style = {
      container: {
        "padding-top": "200px",
        "padding-bottom": "100px",
        width: "100%",
        //"line-height": "300px",
        "text-align": "center",
        position: "relative",
      }
    }
    return (
      <div className="Login">
        <div style={style.container }>
          <SiteInfo/>
        </div>
        <GithubButton onClick={()=>this.handleLogin()}/>
      </div>
    );
  }
}

export default withRouter(Login);

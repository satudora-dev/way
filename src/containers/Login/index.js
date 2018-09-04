import React, { Component } from 'react';
import {firebaseDB,firebaseAuth} from '../../firebase';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRouter} from 'react-router-dom';

const ref = firebaseDB.ref('accounts');

function GithubButton(props){
  const style = {
    SvgIcon: {
      "font-size": "84px",
    },
  };
  return(
    <div>
      <IconButton variant="fab" aria-label="github">
        <div onClick={props.onClickEvent}>
          <SvgIcon{...props} style={style.SvgIcon}>//アイコンの大きさの変更ができない
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </SvgIcon>
        </div>
      </IconButton>
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
      state: {ref: refKey},
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
      imgstyle: {
        "vertical-align": "middle",
        width: 256,
        height: 128,
      },
      container: {
        width: "100%",
        "line-height": "300px",
        "text-align": "center",
        position: "relative",
      }
    }
    return (
      <div className="Login">
        <div style={style.container}>
          <img src="./way.png" style={style.imgstyle}
            alt="loading the way image..." />
        </div>
        <GithubButton onClick={()=>this.handleLogin()}/>
      </div>
    );
  }
}

export default withRouter(Login);

import React, { Component } from 'react';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../../firebase';
import {withRouter,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckInstax from '../../components/CheckInstax';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      givenName: "",
      familyName: "",
      sei: "",
      mei: "",
      iconFile: "",
      iconSrc: "/portrait.png",
      id: "",
      onCheck: true,
    };

    this.onTextChange=this.onTextChange.bind(this);
    this.onSendProfile=this.onSendProfile.bind(this);
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user){
        this.props.history.push('/login');
        return;
      }

      let dbRef=firebaseDB.ref('accounts');
      dbRef.orderByChild('email').equalTo(user.email)//メールアドレスが既に登録されているか
        .once('value',(snapshot)=>{
          if(snapshot.val()==null){
            this.props.history.push('/login');
          }
          else{
            let registered;
            snapshot.forEach((childSnapshot)=>{
              registered=childSnapshot.child('registered').val();
              this.setState({id: childSnapshot.key});
            });
  
            if(registered){
              this.props.history.push('/users');
            }
            else{
              this.setState({onCheck: false});
            }
          }
      });
    });
  }

  onTextChange(e){
    switch(e.target.name){
      case 'givenName':
        this.setState({
          givenName: e.target.value,
        });
        break;
      case 'familyName':
        this.setState({
          familyName: e.target.value,
        });
        break;
      case 'sei':
        this.setState({
          sei: e.target.value,
        });
        break;
      case 'mei':
        this.setState({
          mei: e.target.value,
        });
        break;
      case 'icon':
        if(!e.target.files[0])return;
        this.resizeImage(e.target.files[0]);
        break;
    }
  }

  resizeImage(iconFile){
    let image=new Image();
    image.onload=()=>{
      let width=image.width;
      let height=image.height;
      let maxWidth=512;
      if(width<maxWidth){
        this.setState({
          iconFile: iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
        return;
      }
      else{
        let scale=maxWidth/width;
        let dstHeight=height*scale;
        let canvas=document.createElement('canvas');
        canvas.width=maxWidth;
        canvas.height=dstHeight;
        let ctx=canvas.getContext('2d');
        ctx.drawImage(image,0,0,maxWidth,dstHeight);

        let resizedImage=canvas.toDataURL('image/png');
        canvas.toBlob((blob)=>{
          this.setState({iconFile: blob});
        });
        this.setState({iconSrc: resizedImage});
      }
    };
    image.src=URL.createObjectURL(iconFile);
  }

  onSendProfile(e){
    if(!this.state.givenName){
      alert('Given name is empty.');
      return;
    }
    else if(!this.state.familyName){
      alert('Famili name is empty.');
      return;
    }
    else if(!this.state.sei){
      alert('姓が未入力です。');
      return;
    }
    else if(!this.state.mei){
      alert('名が未入力です。');
      return;
    }
    else if(!this.state.iconFile){
      alert('Icon image is empty.');
      return;
    }
    //alert(this.state.iconFile);
    firebaseDB.ref('users/'+this.state.id).set({
      "given": this.state.givenName,
      "family": this.state.familyName,
      "sei": this.state.sei,
      "mei": this.state.mei,
      "haveIcon": this.state.iconFile!==""
    });
    firebaseDB.ref('accounts/'+this.state.id).update({'registered': true});
    
    if(this.state.iconFile){
      let storageRef=firebaseStorage.ref().child(
        'icons/'+this.state.id);
        storageRef.put(this.state.iconFile).then((snapshot)=>{
          this.props.history.push('/users');
      });
    }
    else{
      this.props.history.push('/users');
    }
  }

  render() {

    if(this.state.onCheck) return(<div></div>);

    const style = {
      imagestyle: {
        width: 64,
        height: 32,
        "padding-top": "20px",
      },
      welcomestyle: {
        color: "grey",
        "font-weight": "lighter",
      },
      pstyle: {
        "margin-bottom": "0px",
      },
      iconstyle: {
        width: 200,
        height:200,
        "border-radius": "50%",
        "object-fit": "cover",
      },
    }

    return (
      <div className="Login">
        <div>
          <Link to="/">
            <img src="way.png" style={style.imagestyle} alt="failed loading the way image." />
          </Link>
        </div>
        <h3 style={style.welcomestyle}>Welcome. Who Are You?</h3>        
        <form noValidate autoComplete="off">
          <TextField
            name="givenName"
            label="given name"
            required={true}
            value={this.state.given_name}
            onChange={this.onTextChange}
            margin="normal"
            style={style.welcomestyle} />
          <TextField
            name="familyName"
            label="family name"
            required={true}
            value={this.state.family_name}
            onChange={this.onTextChange}
            margin="normal"
            style={style.welcomestyle} />
        </form>
        <form noValidate autoComplete="off">
          <TextField
            name="mei"
            label="名"
            required={true}
            value={this.state.mei}
            onChange={this.onTextChange}
            margin="normal"
            style={style.welcomestyle} />
          <TextField
            name="sei"
            label="姓"
            required={true}
            value={this.state.sei}
            onChange={this.onTextChange}
            margin="normal"
            style={style.welcomestyle} />
        </form>
        <div>
          <img src={this.state.iconSrc} style={style.iconstyle}/>
        </div>
        <div>
          <input type="file" accept="image" name="icon" onChange={this.onTextChange}/>
        </div>
        <div>
          <CheckInstax/>
        </div>
        <Button variant="contained"  onClick={this.onSendProfile}>
          GO
        </Button>
      </div>
    );
  }
}

export default withRouter(Signup);

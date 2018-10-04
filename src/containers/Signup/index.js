import React, { Component } from 'react';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../../firebase';
import {withRouter,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckInstax from '../../components/CheckInstax';
import EXIF from 'exif-js';
import SiteInfo from "../../components/SiteInfo";

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      familyName: "",
      givenName: "",
      iconFile: "",
      iconSrc: "/portrait.png",
      id: "",
      mei: "",
      onCheck: true,
      sei: "",
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
        if(!e.target.files[0]){
          return;
        }
        this.optimizeImage(e.target.files[0]);
        break;
    }
  }

  optimizeImage(iconFile){
    let image=new Image();
    let parent = this;
    image.onload=()=> {
      let width = image.width;
      let height = image.height;
      let maxWidth = 512;
      if (width < maxWidth) {
        this.setState({
          iconFile: iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
      }
      else {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');

        var orientation;

        EXIF.getData(iconFile, function () {
          orientation = iconFile.exifdata.Orientation;

          let ImageAspect;
          let canvasWidth;
          let canvasHeight;
          // アスペクト取得
          ImageAspect = (orientation === 5 || orientation === 6 || orientation === 7 || orientation === 8) ? image.width / image.height : image.height / image.width;

          canvasWidth = image.width;
          canvasHeight = Math.floor(canvasWidth * ImageAspect);

          // リサイズ
          const scale=maxWidth/canvasWidth;
          const dstWidth = maxWidth;
          const dstHeight = canvasHeight*scale;
          canvas.width=dstWidth;
          canvas.height=dstHeight;
          ctx.scale(scale, scale)

          // iPhoneで撮った写真はブラウザ上で回転してしまう。
          // exifに応じて画像の変換(上下左右反転と回転）

          let drawWidth = canvasWidth;
          let drawHeight = canvasHeight;

          switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, canvasWidth, 0);
              break;

            case 3:
              ctx.transform(-1, 0, 0, -1, canvasWidth, canvasHeight);
              break;

            case 4:
              ctx.transform(1, 0, 0, -1, 0, canvasHeight);
              break;

            case 5:
              ctx.transform(-1, 0, 0, 1, 0, 0);
              ctx.rotate((90 * Math.PI) / 180);
              drawWidth = canvasHeight;
              drawHeight = canvasWidth;
              break;

            case 6:
              ctx.transform(1, 0, 0, 1, canvasWidth, 0);
              ctx.rotate((90 * Math.PI) / 180);
              drawWidth = canvasHeight;
              drawHeight = canvasWidth;
              break;

            case 7:
              ctx.transform(-1, 0, 0, 1, canvasWidth, canvasHeight);
              ctx.rotate((-90 * Math.PI) / 180);
              drawWidth = canvasHeight;
              drawHeight = canvasWidth;
              break;

            case 8:
              ctx.transform(1, 0, 0, 1, 0, canvasHeight);
              ctx.rotate((-90 * Math.PI) / 180);
              drawWidth = canvasHeight;
              drawHeight = canvasWidth;
              break;

            default:
              break;
          }

          ctx.drawImage(image, 0, 0, drawWidth, drawHeight)

          // 変換後の画像をアップロード&ステートに設定
          const transformedImage = canvas.toDataURL('image/png');
          parent.setState({iconSrc: transformedImage});
          canvas.toBlob((blob) => {
            parent.setState({iconFile: blob});
            parent.uploadImage();
          });
        });
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
      "family": this.state.familyName,
      "given": this.state.givenName,
      "haveIcon": this.state.iconFile!=="",
      "mei": this.state.mei,
      "sei": this.state.sei,
    });
    firebaseDB.ref('accounts/'+this.state.id).update({'registered': true});

    let MyId = this.state.id;
    let MyIcon = this.state.iconSrc;


    if(this.state.iconFile){
      let storageRef=firebaseStorage.ref().child(
        'icons/'+this.state.id);
        storageRef.put(this.state.iconFile).then((snapshot)=>{
          this.props.history.push({
            pathname: `/users/${MyId}`,
            state: {tut: true, icon: MyIcon},
          });
      });
    }
    else{
      this.props.history.push({
        pathname: `/users/${MyId}`,
        state: {tut: true, icon: MyIcon},
      });
    };
  }

  render() {

    if(this.state.onCheck){
      return(<div></div>);
    }

    const style = {
      WAYstyle: {
        color: "black",
        "font-weight": "bold",
      },
      iconstyle: {
        "border-radius": "50%",
        height:200,
        "object-fit": "cover",
        width: 200,
      },
      imagestyle: {
        height: 32,
        "padding-top": "20px",
        width: 64,
      },
      pstyle: {
        "margin-bottom": "0px",
      },
      siteInfoStyle: {
       "margin-top": "30px",
      },
      welcomestyle: {
        color: "grey",
        "font-weight": "lighter",
      },
    }

    return (
      <div className="Login">
        <div style={style.siteInfoStyle}>
          <SiteInfo/>
        </div>
        <h3 style={style.welcomestyle}>Welcome.
        <span style={style.WAYstyle}> W</span>
        ho
        <span style={style.WAYstyle}> A</span>
        re
        <span style={style.WAYstyle}> Y</span>
        ou?</h3>
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

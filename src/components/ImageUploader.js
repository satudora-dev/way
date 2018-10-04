import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import EXIF from 'exif-js';
import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../firebase';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      iconFile: "",
      iconSrc: "",
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({iconSrc: nextprops.src});
  }

  onTextChange(e){
    if(!e.target.files[0]){
      return;
    }
    this.optimizeImage(e.target.files[0]);
  }

  uploadImage(){
    firebaseDB.ref(`users/${this.props.id}/haveIcon`).set(this.state.iconFile!=="");

    if(this.state.iconFile){
      const storageRef=firebaseStorage.ref().child(
        'icons/'+this.props.id);
      storageRef.put(this.state.iconFile);
    }
  }

  optimizeImage(iconFile){
    const image=new Image();
    const parent = this;
    image.onload=()=> {
      const width = image.width;
      const height = image.height;
      const maxWidth = 512;
      if (width < maxWidth) {
        this.setState({
          iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
        this.uploadImage();
      }
      else {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        let orientation;

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

changeMessage(e) {
  this.setState({
    textMessage: e.target.value
  });
}

onClickButton(){
  this.refs.fileInput.click();
}

render() {

    if(this.state.onCheck) { return(<div></div>); }

    const style = {
      btnstyle: {
        "background-color": "#04B486",
        "color": "white",
        margin:0,
        position:"absolute",
        right:"32px",
        top:"240px",
      },
      imgstyle: {
        "border-radius": "50%",
        height: "256px",
        "margin-top": "30px",
        "object-fit": "cover",
        width: "256px",
      },
    }

    return (
      <div>
      <div style={{position:"relative",width:"256px",margin:"auto"}}>
        <img src={this.state.iconSrc} style={style.imgstyle} alt="Loading..."/>
        <input type="file" style={{display: "none"}} onChange={e => this.onTextChange(e)} ref="fileInput"/>

        {(() => {
          if(this.props.canEdit) {
            return(
              <Button mini={true} onClick={()=>this.onClickButton()} variant="fab" style={style.btnstyle}>
                <EditIcon/>
              </Button>
            )
          }
        })()}
        </div>
        <div className="Login">
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

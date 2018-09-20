import React, { Component } from 'react';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../firebase';
import {withRouter,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import EXIF from 'exif-js';

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
    if(!e.target.files[0])return;
    this.optimizeImage(e.target.files[0]);
  }

  uploadImage(){
    firebaseDB.ref('users/'+this.props.id+"/haveIcon").set(this.state.iconFile!=="");

    if(this.state.iconFile){
      let storageRef=firebaseStorage.ref().child(
        'icons/'+this.props.id);
      storageRef.put(this.state.iconFile);
    }
  }

  optimizeImage(iconFile){
    let image=new Image();
    let _this = this;
    image.onload=()=> {
      let width = image.width;
      let height = image.height;
      let maxWidth = 512;
      if (width < maxWidth) {
        this.setState({
          iconFile: iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
        this.uploadImage();
      }
      else {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');

        var orientation;

        EXIF.getData(iconFile, function () {
          orientation = iconFile.exifdata.Orientation;

          var image_aspect, canvas_width, canvas_height, draw_width, draw_height;
          //アスペクト取得
          image_aspect = (orientation == 5 || orientation == 6 || orientation == 7 || orientation == 8) ? image.width / image.height : image.height / image.width;

          canvas_width = image.width;
          canvas_height = Math.floor(canvas_width * image_aspect);

          // リサイズ
          const scale=maxWidth/canvas_width;
          const dst_width = maxWidth;
          const dst_height = canvas_height*scale;
          canvas.width=dst_width;
          canvas.height=dst_height;
          ctx.scale(scale, scale)

          // iPhoneで撮った写真はブラウザ上で回転してしまう。
          // exifに応じて画像の変換(上下左右反転と回転）

          var draw_width = canvas_width;
          var draw_height = canvas_height;

          switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, canvas_width, 0);
              break;

            case 3:
              ctx.transform(-1, 0, 0, -1, canvas_width, canvas_height);
              break;

            case 4:
              ctx.transform(1, 0, 0, -1, 0, canvas_height);
              break;

            case 5:
              ctx.transform(-1, 0, 0, 1, 0, 0);
              ctx.rotate((90 * Math.PI) / 180);
              draw_width = canvas_height;
              draw_height = canvas_width;
              break;

            case 6:
              ctx.transform(1, 0, 0, 1, canvas_width, 0);
              ctx.rotate((90 * Math.PI) / 180);
              draw_width = canvas_height;
              draw_height = canvas_width;
              console.log("6!")
              break;

            case 7:
              ctx.transform(-1, 0, 0, 1, canvas_width, canvas_height);
              ctx.rotate((-90 * Math.PI) / 180);
              draw_width = canvas_height;
              draw_height = canvas_width;
              break;

            case 8:
              ctx.transform(1, 0, 0, 1, 0, canvas_height);
              ctx.rotate((-90 * Math.PI) / 180);
              draw_width = canvas_height;
              draw_height = canvas_width;
              break;

            default:
              break;
          }

          ctx.drawImage(image, 0, 0, draw_width, draw_height)

          // 変換後の画像をアップロード&ステートに設定
          let transformedImage = canvas.toDataURL('image/png');
          _this.setState({iconSrc: transformedImage});
          canvas.toBlob((blob) => {
            _this.setState({iconFile: blob});
            _this.uploadImage();
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

    if(this.state.onCheck) return(<div></div>);

    const style = {
      imgstyle: {
        height: "256px",
        width: "256px",
        "border-radius": "50%",
        "margin-top": "100px",
        "object-fit": "cover",
      },
      btnstyle: {
        "margin-right": "10px",
        "margin-bottom": "10px",
        "background-color": "#04B486",
        "color": "white",
        "text-transform": "none",
      },
    }

    return (
      <div>
        <img src={this.state.iconSrc} style={style.imgstyle} alt="Loading..."/>
        <input type="file" style={{display: "none"}} onChange={e => this.onTextChange(e)} ref="fileInput"/>

        {(() => {
          if(this.props.canEdit)
            return(
              <Button mini onClick={()=>this.onClickButton()} variant="fab" style={style.btnstyle}>
                <EditIcon/>
              </Button>
            )
        })()}

        <div className="Login">
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

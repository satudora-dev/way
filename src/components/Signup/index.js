import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EXIF from 'exif-js';
import SiteInfo from "../../components/SiteInfo";


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
    };

    this.onTextChange=this.onTextChange.bind(this);
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
        this.optimizeImage(e.target.files[0]);
        break;
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

          // 変換後の画像をステートに設定
          let transformedImage = canvas.toDataURL('image/png');
          _this.setState({iconSrc: transformedImage});
          canvas.toBlob((blob) => {
            _this.setState({iconFile: blob});
          });
        });
      }
    };
    image.src=URL.createObjectURL(iconFile);
  }



  render() {


    const style = {
      imagestyle: {
        width: 64,
        height: 32,
        "padding-top": "20px",
      },
      siteInfoStyle: {
       "margin-top": "30px",
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
      WAYstyle: {
        color: "black",
        "font-weight": "bold",
      }
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
        ou?<
        /h3>
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
        <Button variant="contained"  onClick={() => {
          this.props.signUpAsUser(this.props.ownKey,
                                  this.state.givenName,
                                  this.state.familyName,
                                  this.state.mei,
                                  this.state.sei,
                                  this.state.iconFile);
        }}>
          GO
        </Button>
      </div>
    );
  }
}

export default Signup;

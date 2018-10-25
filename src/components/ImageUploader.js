import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
// import EXIF from 'exif-js';

class ImageUploader extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     iconFile: "",
  //     iconSrc: "",
  //   };
  // }

  // componentWillReceiveProps(nextprops){
  //   this.setState({iconSrc: nextprops.src});
  // }

  // // uploadOptimizedImage(iconFile){
  //   console.log(this.props)
  //   if(!iconFile)return;
  //
  //   let image=new Image();
  //   let _this = this;
  //   image.onload=()=> {
  //     console.log("asako")
  //     let width = image.width;
  //     let height = image.height;
  //     let maxWidth = 512;
  //     if (width < maxWidth) {
  //       this.setState({
  //         iconFile: iconFile,
  //       });
  //       this.props.updateIcon(this.state.iconFile,this.props.profileUserKey);
  //     }
  //     else {
  //       let canvas = document.createElement('canvas');
  //       canvas.width = width;
  //       canvas.height = height;
  //       let ctx = canvas.getContext('2d');
  //
  //       var orientation;
  //
  //       EXIF.getData(iconFile, function () {
  //         orientation = iconFile.exifdata.Orientation;
  //
  //         var image_aspect, canvas_width, canvas_height, draw_width, draw_height;
  //         //アスペクト取得
  //         image_aspect = (orientation == 5 || orientation == 6 || orientation == 7 || orientation == 8) ? image.width / image.height : image.height / image.width;
  //
  //         canvas_width = image.width;
  //         canvas_height = Math.floor(canvas_width * image_aspect);
  //
  //         // リサイズ
  //         const scale=maxWidth/canvas_width;
  //         const dst_width = maxWidth;
  //         const dst_height = canvas_height*scale;
  //         canvas.width=dst_width;
  //         canvas.height=dst_height;
  //         ctx.scale(scale, scale)
  //
  //         // iPhoneで撮った写真はブラウザ上で回転してしまう。
  //         // exifに応じて画像の変換(上下左右反転と回転）
  //
  //         var draw_width = canvas_width;
  //         var draw_height = canvas_height;
  //
  //         switch (orientation) {
  //           case 2:
  //             ctx.transform(-1, 0, 0, 1, canvas_width, 0);
  //             break;
  //
  //           case 3:
  //             ctx.transform(-1, 0, 0, -1, canvas_width, canvas_height);
  //             break;
  //
  //           case 4:
  //             ctx.transform(1, 0, 0, -1, 0, canvas_height);
  //             break;
  //
  //           case 5:
  //             ctx.transform(-1, 0, 0, 1, 0, 0);
  //             ctx.rotate((90 * Math.PI) / 180);
  //             draw_width = canvas_height;
  //             draw_height = canvas_width;
  //             break;
  //
  //           case 6:
  //             ctx.transform(1, 0, 0, 1, canvas_width, 0);
  //             ctx.rotate((90 * Math.PI) / 180);
  //             draw_width = canvas_height;
  //             draw_height = canvas_width;
  //             break;
  //
  //           case 7:
  //             ctx.transform(-1, 0, 0, 1, canvas_width, canvas_height);
  //             ctx.rotate((-90 * Math.PI) / 180);
  //             draw_width = canvas_height;
  //             draw_height = canvas_width;
  //             break;
  //
  //           case 8:
  //             ctx.transform(1, 0, 0, 1, 0, canvas_height);
  //             ctx.rotate((-90 * Math.PI) / 180);
  //             draw_width = canvas_height;
  //             draw_height = canvas_width;
  //             break;
  //
  //           default:
  //             break;
  //         }
  //
  //         ctx.drawImage(image, 0, 0, draw_width, draw_height)
  //
  //         // 変換後の画像をアップロード&ステートに設定
  //         let transformedImage = canvas.toDataURL('image/png');
  //         canvas.toBlob((blob) => {
  //           _this.setState({iconFile: blob});
  //           _this.props.updateIcon(_this.state.iconFile,_this.props.profileUserKey);
  //         });
  //       });
  //     }
  //   };
  // }



render() {


    const style = {
      imgstyle: {
        height: "256px",
        width: "256px",
        borderRadius: "50%",
        marginTop: "30px",
        objectFit: "cover",
      },
      btnstyle: {
        position:"absolute",
        backgroundColor: "#04B486",
        "color": "white",
        top:"240px",
        right:"32px",
        margin:0,
      },
    }

    return (
      <div>
      <div style={{position:"relative",width:"256px",margin:"auto"}}>
        <img src={this.props.src} style={style.imgstyle} alt="Loading..."/>
        <input type="file" style={{display: "none"}} onChange={e => {
              this.props.updateIcon(e.target.files[0],this.props.profileUserKey);
        }} ref="fileInput"/>

        {(() => {
          if(this.props.canEdit)
            return(
              <Button mini onClick={()=>this.refs.fileInput.click()} variant="fab" style={style.btnstyle}>
                <EditIcon/>
              </Button>
            )
        })()}
        </div>
        <div className="Login">
        </div>
      </div>
    );
  }
}

export default ImageUploader;

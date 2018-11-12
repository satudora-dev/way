import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CirclarProgress from '@material-ui/core/CircularProgress';
import EXIF from 'exif-js';
import CircularProgress from '@material-ui/core/CircularProgress';

const createObjectURL
  = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: props.iconSrc,
      rotation: 'rotate(0deg)',
      scale: 'scale(1,1)',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ iconSrc: nextProps.iconSrc });
  }

  onIconChange(e) {

    let imageFile = e.target.files[0];
    if (!e) return;

    //this.props.deleteIconRef(this.props.profileUserKey);
    this.optimizeImageOrientation(imageFile).then(imageFile =>
      this.resizeImage(imageFile).then(imageFile =>
        this.props.uploadIcon(imageFile, this.props.profileUserKey)));

    //this.optimizeImageOrientation(imageFile);
  }

  resizeImage(iconFile) {

    return new Promise(resolve => {
      let image = new Image();
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        let maxSize = 112;

        let canvas = document.createElement('canvas');
        let aspect = image.width / image.height;
        let scale = 1;

        if (aspect > 1 && image.width > maxSize) {
          canvas.width = maxSize;
          canvas.height = Math.floor(maxSize / aspect);
          scale = maxSize / image.width;
        }
        else if (aspect <= 1 && image.height > maxSize) {
          canvas.height = maxSize;
          canvas.width = Math.floor(maxSize * aspect);
          scale = maxSize / image.height;
        }
        else {
          canvas.width = image.width;
          canvas.height = image.height;
          scale = 1;
        }

        let ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        ctx.drawImage(image, 0, 0, image.width, image.height);

        canvas.toBlob(blob => {
          this.setState({ iconSrc: canvas.toDataURL('image/png') });
          resolve(blob);
        });
      };
      image.src = URL.createObjectURL(iconFile);
    });
  }

  optimizeImageOrientation(imageFile) {


    return new Promise(resolve => {
      let image = new Image();
      image.onload = () => {
        EXIF.getData(imageFile, () => {
          let orientation = imageFile.exifdata.Orientation;
          //console.log(imageFile.exifdata.Orientation);
          //console.log(orientation);
          let canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.height = image.height;
          let ctx = canvas.getContext('2d');
          switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, image.width, 0);
              break;

            case 3:
              ctx.transform(-1, 0, 0, -1, image.width, image.height);
              break;

            case 4:
              ctx.transform(1, 0, 0, -1, 0, image.height);
              break;

            case 5:
              ctx.transform(-1, 0, 0, 1, 0, 0);
              ctx.rotate((90 * Math.PI) / 180);
              break;

            case 6:
              ctx.transform(1, 0, 0, 1, image.width, 0);
              ctx.rotate((90 * Math.PI) / 180);
              break;

            case 7:
              ctx.transform(-1, 0, 0, 1, image.width, image.height);
              ctx.rotate((-90 * Math.PI) / 180);
              break;

            case 8:
              ctx.transform(1, 0, 0, 1, 0, image.height);
              ctx.rotate((-90 * Math.PI) / 180);
              break;

            default:
              break;
          }

          let drawWidth;
          let drawHeight;
          if (orientation < 5) {
            drawWidth = image.width;
            drawHeight = image.height;
          }
          else {
            drawWidth = image.height;
            drawHeight = image.width;
          }
          ctx.drawImage(image, 0, 0, drawWidth, drawHeight);          

          canvas.toBlob(blob => {
            resolve(blob);
          });
        });
      }
      image.src = URL.createObjectURL(imageFile);
    });
  }

  render() {

    const style = {
      imgstyle: {
        height: "256px",
        width: "256px",
        borderRadius: "50%",
        marginTop: "30px",
        objectFit: "cover",
        transform: `${this.state.rotation} ${this.state.scale} `,
      },
      btnstyle: {
        position: "absolute",
        backgroundColor: "#04B486",
        "color": "white",
        top: "240px",
        right: "32px",
        margin: 0,
      },
    }

    return (
      <div>
        <div style={{ position: "relative", width: "256px", margin: "auto" }}>
          {(() => {
            if (this.props.iconSrc) {
              return (
                <div>
                  <img src={this.state.iconSrc}
                    style={style.imgstyle} alt="Loading..." />
                </div>
              );
            }
            else {
              return <CircularProgress />
            }
          })()}
          {(() => {
            if (this.props.canEdit) {
              return (
                <div>
                  <input type="file" style={{ display: "none" }}
                    onChange={e => this.onIconChange(e)}
                    ref='fileInput' />
                  <Button mini onClick={() => this.refs.fileInput.click()}
                    variant="fab" style={style.btnstyle}>
                    <EditIcon />
                  </Button>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

export default ImageUploader;

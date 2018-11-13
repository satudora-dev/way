import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CirclarProgress from '@material-ui/core/CircularProgress';
import EXIF from 'exif-js';
import CircularProgress from '@material-ui/core/CircularProgress';

const createObjectURL
  = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class IconPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: props.iconSrc,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ iconSrc: nextProps.iconSrc });
  }

  onIconChange(e) {

    let imageFile = e.target.files[0];
    if (!imageFile) return;

    this.setState({ iconSrc: null });
    this.optimizeImageOrientation(imageFile).then(imageFile =>
      this.resizeImage(imageFile).then(imageFile =>
        this.props.onChange(imageFile)));
  }

  optimizeImageOrientation(imageFile) {

    return new Promise(resolve => {
      let image = new Image();
      image.onload = () => {
        EXIF.getData(imageFile, () => {
          let orientation = imageFile.exifdata.Orientation;

          if (!orientation) {
            resolve(imageFile);
            return;
          }

          let canvas = document.createElement('canvas');
          if (orientation <= 4) {
            canvas.width = image.width;
            canvas.height = image.height;
          }
          else {
            canvas.width = image.height;
            canvas.height = image.width;
          }

          let ctx = canvas.getContext('2d');

          switch (orientation) {//‰ñ“]
            case 3:
            case 4:
              ctx.rotate(Math.PI);
              ctx.translate(-image.width, -image.height);
              break;

            case 5:
            case 6:
              ctx.rotate(Math.PI / 2);
              ctx.translate(0, -image.height);
              break;

            case 7:
            case 8:
              ctx.rotate(Math.PI * 3 / 2);
              ctx.translate(-image.width, 0);
              break;

            default:
              break;
          }

          if (orientation == 2 || orientation == 4) {//”½“]
            ctx.scale(-1, 1);
            ctx.translate(-image.width, 0);
          }
          if (orientation == 5 || orientation == 7) {//”½“]
            ctx.scale(1, -1);
            ctx.translate(0, -image.height);
          }

          ctx.drawImage(image, 0, 0, image.width, image.height);          

          canvas.toBlob(blob => {
            resolve(blob);
          });
        });
      }
      image.src = URL.createObjectURL(imageFile);
    });
  }

  resizeImage(iconFile) {

    return new Promise(resolve => {
      let image = new Image();
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        let maxSize = 512;

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

        this.setState({ iconSrc: canvas.toDataURL('image/png') });
        canvas.toBlob(blob => {
          resolve(blob);
        });
      };
      image.src = URL.createObjectURL(iconFile);
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
            if (this.state.iconSrc) {
              return (
                <div>
                  <img src={this.state.iconSrc}
                    style={style.imgstyle} />
                </div>
              );
            }
            else {
              return <CircularProgress
                style={style.imgstyle}/>
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
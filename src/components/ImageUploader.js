import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import EXIF from 'exif-js';

const createObjectURL
  = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: props.iconSrc,
      rotation: 'rotate(0deg)',
      transform: 'scale(1,1)',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ iconSrc: nextProps.iconSrc });
  }

  optimizeImage(e) {
    let imageFile = e.target.files[0];
    this.setState({ iconSrc: createObjectURL(imageFile) });
    EXIF.getData(imageFile, () => {
      let orientation = imageFile.exifdata.Orientation;
      let rotation = 0;
      switch ((orientation - 1) / 2) {
        case 0:
          rotation = 'rotate(0deg)';
        case 1:
          rotation = 'rotate(180deg)';
          break;
        case 2:
          rotation = 'rotate(90deg)';
          break;
        case 3:
          rotation = 'rotate(270deg)';
          break;
        default:
          break;
      }
      let transform = 'scale(1,1)';
      if (orientation === 2 || orientation === 4
        || orientation === 5 || orientation === 7) {
        transform = 'scale(-1,1)';
      }
      this.setState({
        iconSrc: createObjectURL(imageFile),
        rotation: rotation,
        transform: transform,
      })
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
        transform: this.state.transform + " " + this.state.rotation,
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
          <img src={this.state.iconSrc} style={style.imgstyle} alt="Loading..." />
          <input type="file" style={{ display: "none" }}
            onChange={e => this.optimizeImage(e)}
            ref="fileInput" />

          {(() => {
            if (this.props.canEdit)
              return (
                <Button mini onClick={() => this.refs.fileInput.click()} variant="fab" style={style.btnstyle}>
                  <EditIcon />
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

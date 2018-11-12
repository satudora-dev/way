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
      scale: 'scale(1,1)',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ iconSrc: nextProps.iconSrc });
  }

  onIconChange(e) {

    let imageFile = e.target.files[0];
    this.props.deleteIconRef(this.props.profileUserKey);
    this.props.uploadIcon(imageFile, this.props.profileUserKey);

    this.optimizeImageOrientation(imageFile);
  }

  optimizeImageOrientation(imageFile) {
    
    EXIF.getData(imageFile, () => {
      let orientation = imageFile.exifdata.Orientation;
      let rotation = 0;

      switch (orientation) {
        case 1:
        case 2:
          rotation = 'rotate(0deg)';
          break;

        case 3:
        case 4:
          rotation = 'rotate(180deg)';
          break;

        case 6:
        case 7:
          rotation = 'rotate(90deg)';
          break;

        case 5:
        case 8:
          rotation = 'rotate(270deg)';
          break;

        default:
          break;
      }

      let scale;
      if (orientation === 2 || orientation === 4
        || orientation === 5 || orientation === 7) {
        scale = 'scale(-1,1)';
      }
      else {
        scale = 'scale(1,1)';
      }
      
      this.setState({
        iconSrc: createObjectURL(imageFile),
        rotation: rotation,
        scale: scale,
      });
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
          <img src={this.state.iconSrc} style={style.imgstyle} alt="Loading..." />
          <input type="file" style={{ display: "none" }}
            onChange={e => this.onIconChange(e)}
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

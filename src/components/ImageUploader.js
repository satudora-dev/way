import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

class ImageUploader extends Component {

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
        <img src={this.props.iconSrc} style={style.imgstyle} alt="Loading..."/>
        <input type="file" style={{display: "none"}} onChange={e => {
              this.props.uploadIcon(e.target.files[0],this.props.profileUserKey);
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

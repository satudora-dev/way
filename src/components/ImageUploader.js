import React, { Component } from 'react';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../firebase';
import {withRouter,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      iconFile: "",
      iconSrc: "/portrait.png",
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({iconSrc: nextprops.src});
  }

  onTextChange(e){
    if(!e.target.files[0])return;
    this.resizeImage(e.target.files[0]);
  }

  uploadImage(){
    firebaseDB.ref('users/'+this.props.id+"/haveIcon").set(this.state.iconFile!=="");
    
    if(this.state.iconFile){
      let storageRef=firebaseStorage.ref().child(
        'icons/'+this.props.id);
        storageRef.put(this.state.iconFile);
    }
  }

  resizeImage(iconFile){
    let image=new Image();
    image.onload=()=>{
      let width=image.width;
      let height=image.height;
      let maxWidth=512;
      if(width<maxWidth){
        this.setState({
          iconFile: iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
        this.uploadImage();
      }
      else{
        let scale=maxWidth/width;
        let dstHeight=height*scale;
        let canvas=document.createElement('canvas');
        canvas.width=maxWidth;
        canvas.height=dstHeight;
        let ctx=canvas.getContext('2d');
        ctx.drawImage(image,0,0,maxWidth,dstHeight);

        let resizedImage=canvas.toDataURL('image/png');
        this.setState({iconSrc: resizedImage});
        canvas.toBlob((blob)=>{
          this.setState({iconFile: blob});
          this.uploadImage();
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
      <img src={this.state.iconSrc} style={style.imgstyle}/>
      <input type="file" style={{display: "none"}} onChange={e => this.onTextChange(e)} ref="fileInput"/>
      <Button mini onClick={()=>this.onClickButton()} variant="fab" style={style.btnstyle}>
        <EditIcon/>
      </Button>
      <div className="Login">
      </div>
      </div>
    );
  }
}

export default withRouter(Signup);

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EXIF from 'exif-js';
import SiteInfo from "../../components/SiteInfo";
import IconPreview from '../IconPreview';

const createObjectURL
  = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: "",
      familyName: "",
      sei: "",
      mei: "",
      iconFile: "",
      iconSrc: "/portrait.png",
      id: "",
    };

    this.onTextChange = this.onTextChange.bind(this);
  }


  onTextChange(e) {
    switch (e.target.name) {
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
    }
  }

  getIconFile(imageFile) {
    this.setState({
      iconFile: imageFile,
      iconSrc: createObjectURL(imageFile),
    });
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
        height: 200,
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
          <SiteInfo />
        </div>
        <h3 style={style.welcomestyle}>Welcome.
        <span style={style.WAYstyle}> W</span>
          ho
        <span style={style.WAYstyle}> A</span>
          re
        <span style={style.WAYstyle}> Y</span>
          ou?
          </h3>
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
        <IconPreview
          iconSrc={this.state.iconSrc}
          canEdit={true}
          onChange={imageFile =>
            this.getIconFile(imageFile)} />
        <Button variant="contained" onClick={() => {
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

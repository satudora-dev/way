import React, { Component } from 'react';
import Lottie from 'lottie-react-web';
import logo from './logo_animation.json';


class SiteInfo extends Component {
  render() {
    const style = {
      siteInfo: {
        "padding-top": "30px",
        "text-align": "center",
      },
      wayLogo: {
        "vertical-align": "middle",
        width: 256,
        height: 128,
      },
    }

    return (
      <div style={style.siteInfo}>
        <Lottie options={{ animationData : logo }}/>
        <img src="./way.png" style={style.wayLogo}
             alt="loading the way image..." />
        <h2>AI TOKYO LAB & Co.</h2>
      </div>
    );
  }
}

export default SiteInfo;

import React, { Component } from 'react';

class SiteInfo extends Component {
  render() {
    const style = {
      siteInfo: {
        paddingTop: "30px",
        textAlign: "center",
      },
      wayLogo: {
        verticalAlign: "middle",
        width: 256,
        height: 128,
      },
    }

    return (
      <div style={style.siteInfo}>
        <img src="./way.png" style={style.wayLogo}
             alt="loading..." />
        <h2>AI TOKYO LAB & Co.</h2>
      </div>
    );
  }
}

export default SiteInfo;

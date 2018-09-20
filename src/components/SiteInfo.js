import React, { Component } from 'react';

class SiteInfo extends Component {
  render() {
    const style = {
      siteInfo: {
        "padding-top": "30px",
        "padding-bottom": "30px",
        "text-align": "center",
      },
    }

    return (
      <div style={style.siteInfo}>
        <h2>way</h2>
        <h4>SAPPORO DRUG STORE CO.,LTD.</h4>
      </div>
    );
  }
}

export default SiteInfo;

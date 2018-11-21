import React, { Component } from 'react';
import Lottie from 'lottie-react-web';
import logo from './logo_animation.json';
import styled from 'styled-components';


const SiteGroup = styled.div `
  padding-top: 30px;
  text-align: center;
`



class SiteInfo extends Component {
  render() {

    return (
      <SiteGroup>
            <Lottie 
              options={{ animationData : logo }}
              width={500}
              height={500}
            />
        <h2>AI TOKYO LAB & Co.</h2>
      </SiteGroup>
    );
  }
}

export default SiteInfo;

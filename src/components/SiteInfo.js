import React, { Component } from 'react';
import Lottie from 'lottie-react-web';
import logo from './logo_animation.json';
import styled from 'styled-components';


const SiteGroup = styled.div `
  padding-top: 20px;
  text-align: center;
`
const ProductLogo = styled.div `
  width: 400px;
  height: 110px;
  margin: 0 auto;
`


class SiteInfo extends Component {
  render() {

    return (
      <SiteGroup>
            <ProductLogo>
              <Lottie 
                options={{ animationData : logo }}
              />
            </ProductLogo>
        <h2>AI TOKYO LAB & Co.</h2>
      </SiteGroup>
    );
  }
}

export default SiteInfo;

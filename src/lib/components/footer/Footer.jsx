import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const Footer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`

class Service extends Component {
  render(){
    return(
      <Footer>
        <div className="copyright">
          <h2>DS ©2021</h2>
        </div>
      </Footer>
    );
  };
}

export default Service;

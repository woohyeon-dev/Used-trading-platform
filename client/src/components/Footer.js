import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.div`
  padding: 0 20px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  border-top: 1px solid #dfdfde;

  p {
    font-size: 12px;
    color: #dfdfde;
  }
`;

function Footer() {
  return (
    <FooterBlock>
      <p>Copyright © Create by YeungJin College Students</p>
    </FooterBlock>
  );
}

export default Footer;

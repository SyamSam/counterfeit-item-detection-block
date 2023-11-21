import React from "react";
import styled from "styled-components";

export default function Main({ children }) {
  return (
    <Wrapper>
      <MainContainer>{children}</MainContainer>
      <FooterContainer>      
        <FooterLink href="https://kelrinahof.business.site/">Kelrina Hof Website</FooterLink>
        <FooterLink href="https://www.facebook.com/kelrinahof">Kelrina Hof Facebook</FooterLink>
        <FooterLink href="https://www.instagram.com/kelrina/">Kelrina Hof Instagram</FooterLink>
      </FooterContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Fill available space */
  flex-shrink: 0; /* Prevent shrinking */
`;

const MainContainer = styled.main`
  flex: 1;
  width: 100%;
  max-width: 60%;
  padding: 20px;
  margin: auto;
`;

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: right;
  width: 100%; /* Add this line to make the footer container fill the entire width */
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 10px; /* Add some spacing between links */
`;
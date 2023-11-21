import React from "react";
import styled from "styled-components";

const NavContainer = styled.nav`
background: #E8D9FF;
width: 100%;
display: flex;
justify-content: center;
margin-top: 0;
padding-top: 0;

border: 2px solid #8a61b1;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    width: 100%;
    height:30px;
    max-height:30px;

    li {

      &:not(:last-child) {
        border-right: 1px solid black;
      }
    }
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: 500;
    padding: 10px;

    :hover {
      filter: drop-shadow(0 0 10px green);
      transition: 0.2s;
    }
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 0;
    margin: 0;
  }

  .dropdown-content a {
    display: block;
    padding: 12px 16px;
    text-decoration: none;
    color: black;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

export default function Nav({ children }) {
  return <NavContainer>{children}</NavContainer>;
}
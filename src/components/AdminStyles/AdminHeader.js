import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, Navigate } from "react-router-dom"; // Import Navigate

const HeaderContainer = styled.header`
  width: 100%;
  height: 40px;
  background: #yacce5ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

const KelrinaHofBanner = styled.img`
  height: 50px;
  widht: 50px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.img`
  margin-top: 5px;
  height: 30px;
  width: 30px;
  position: relative;
  cursor: pointer;
`;

const CaretIcon = styled.img`
  height: 12px;
  width: 12px;
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
`;

const DropdownButton = styled.button`
  margin-right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  right: -1px;
  display: ${(props) => (props.show ? "block" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const DropdownItem = styled(NavLink)`
  cursor: pointer;
  margin-bottom: 8px;
  color: black;
  text-decoration: none;
  display: block;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function AdminHeader({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    onLogout();
    setLogout(true);
  };

  return (
    <>
      {logout && <Navigate to="/admin-login" />}
      <HeaderContainer>
        <HeaderLeft>
          <NavLinkStyled exact to="/admin/home">
          <KelrinaHofBanner src="/banner.png"  />
          </NavLinkStyled>
        </HeaderLeft>

        <HeaderRight>
          <div className="dropdown">
            <DropdownButton onClick={handleUserIconClick}>
              <UserIcon
                className="user-icon"
                src="/user.png"
                alt="user-icon"
              />
              <CaretIcon
                src={showDropdown ? "/caretup.png" : "/caretdown.png"}
                alt="caret"
              />
            </DropdownButton>
            <DropdownContent show={showDropdown}>
              {showDropdown && (
                <>
                  <DropdownItem to="/admin-logout" onClick={handleLogout}>Log Out</DropdownItem>
                </>
              )}
            </DropdownContent>
          </div>
        </HeaderRight>
      </HeaderContainer>
    </>
  );
}

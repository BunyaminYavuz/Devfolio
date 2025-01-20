import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope, FaLaptopCode, FaUserShield } from 'react-icons/fa';
import { GiPaintBrush } from 'react-icons/gi';

const Nav = styled.nav`
  background: #1a1a1a;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    height: auto; /* Allow height to adjust */
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 15px 20px;
  font-size: 18px;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #00ff88; /* Change color for active link */
    font-weight: bold; /* Optional: make active link bold */
  }

  &:hover {
    color: #00ff88;
  }

  @media (max-width: 768px) {
    padding: 10px; /* Adjust padding for smaller screens */
    font-size: 16px; /* Adjust font size for smaller screens */
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    margin-right: 0; /* Reset margin */
  }
`;

const Logo = styled(NavLink)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  margin-left: 24px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #00ff88;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">
        <FaLaptopCode style={{ marginRight: '8px', fontSize: '1.5rem' }} />
        Tech Portfolio
      </Logo>
      <NavMenu>
        <StyledNavLink to="/" exact activeClassName="active">
          <FaHome style={{ marginRight: '8px' }} /> Home
        </StyledNavLink>
        <StyledNavLink to="/projects" activeClassName="active">
          <FaProjectDiagram style={{ marginRight: '8px' }} /> Projects
        </StyledNavLink>
        <StyledNavLink to="/about" activeClassName="active">
          <FaUser style={{ marginRight: '8px' }} /> About Me
        </StyledNavLink>
        <StyledNavLink to="/contact" activeClassName="active">
          <FaEnvelope style={{ marginRight: '8px' }} /> Contact
        </StyledNavLink>
        <StyledNavLink to="/admin" activeClassName="active">
          <FaUserShield style={{ marginRight: '8px' }} /> Admin
        </StyledNavLink>
      </NavMenu>
    </Nav>
  );
};

export default Navbar; 
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope, FaLaptopCode } from 'react-icons/fa';
import { GiPaintBrush } from 'react-icons/gi';

const Nav = styled.nav`
  background: #1a1a1a;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 15px 20px;
  font-size: 18px;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #00ff88;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled(Link)`
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
        <NavLink to="/">
          <FaHome style={{ marginRight: '8px' }} /> Home
        </NavLink>
        <NavLink to="/projects">
          <FaProjectDiagram style={{ marginRight: '8px' }} /> Projects
        </NavLink>
        <NavLink to="/about">
          <FaUser style={{ marginRight: '8px' }} /> About Me
        </NavLink>
        <NavLink to="/contact">
          <FaEnvelope style={{ marginRight: '8px' }} /> Contact
        </NavLink>
      </NavMenu>
    </Nav>
  );
};

export default Navbar; 
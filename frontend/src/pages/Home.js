import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiKaggle } from 'react-icons/si';

// A dynamic gradient animation for the background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomeContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #0a0a0a, #1a1a1a, #00ff88, #006644);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const SubTitle = styled.p`
  font-size: 28px;
  font-weight: 400;
  color: #00ff88;
  margin-bottom: 40px;
  text-align: center;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  width: 60px;
  height: 60px;
  background: #00ff88;
  color: #000;
  text-decoration: none;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 255, 136, 0.4);

  &:hover {
    background: #00cc6a;
    transform: scale(1.2);
    box-shadow: 0px 6px 20px rgba(0, 204, 106, 0.6);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>HELLO, I'M BUNYAMİN!</Title>
     <SubTitle>Turning Ideas into Code, Turning Dreams into Reality</SubTitle>
      <ButtonContainer>
        <IconButton href="https://github.com/bunyaminyavuz" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/bunyaminyavuz" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </IconButton>
        <IconButton href="https://www.kaggle.com/bunyaminyavuz" target="_blank" rel="noopener noreferrer">
          <SiKaggle />
        </IconButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;

import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaKaggle } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #121212, #1f1f1f);
  padding: 2rem 1rem;
  color: #f0f0f0;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
`;

const SocialIcon = styled.a`
  color: #00ff88;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00cc70;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
  color: #aaaaaa;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>Let's Connect</h3>
        <LinksContainer>
          <SocialIcon
            href="https://github.com/BunyaminYavuz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com/in/bunyaminyavuz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon
            href="mailto:yavuzzbunyamin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope />
          </SocialIcon>
          <SocialIcon
            href="https://kaggle.com/bunyaminyavuz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaKaggle />
          </SocialIcon>
        </LinksContainer>
        <Copyright>
          &copy; 2025 Portfolio. All rights reserved by me.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

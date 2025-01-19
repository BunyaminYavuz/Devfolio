import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 80px 20px;
  background: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  background: linear-gradient(135deg, #1c1c1c, #333);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #00ff88;
  font-weight: bold;
  text-transform: uppercase;
`;

const Subtitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 10px;
  color: #00ff88;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  color: #ddd;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const IconButton = styled.a`
  background: #1a1a1a;
  color: #00ff88;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #00cc6a;
  }

  svg {
    margin-right: 5px;
  }
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1.1rem;
  color: #ddd;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const SkillItem = styled.li`
  margin-bottom: 10px;
  &:before {
    content: "✔️";
    color: #00ff88;
    margin-right: 10px;
  }
`;

const About = () => {
  const [aboutContent, setAboutContent] = useState({});

  // Fetch About data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/about`);
        const data = await response.json();
        console.log(data); // Log the fetched data
        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching About data:', error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <AboutContainer>
      <Content>
        <Title>{aboutContent.title}</Title>
        <Description>{aboutContent.description}</Description>

        <Subtitle>Contact & Links</Subtitle>
        <ButtonContainer>
          <IconButton href="mailto:yavuzzbunyamin@gmail.com">
            <FaEnvelope /> Email
          </IconButton>
          <IconButton href="https://github.com/BunyaminYavuz" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </IconButton>
          <IconButton href="https://linkedin.com/in/bunyaminyavuz" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </IconButton>
          <IconButton href="https://kaggle.com/bunyaminyavuz" target="_blank" rel="noopener noreferrer">
            <FaKaggle /> Kaggle
          </IconButton>
        </ButtonContainer>

        <Subtitle>Skills</Subtitle>
        {aboutContent.skills && aboutContent.skills.map((category, index) => (
          <div key={index}>
            <Subtitle>{category.category}</Subtitle>
            <SkillsList>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex}>{skill}</SkillItem>
              ))}
            </SkillsList>
          </div>
        ))}

        <Subtitle>Experience</Subtitle>
        <Description>
          {aboutContent.experience && aboutContent.experience.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Description>

        <Subtitle>Education</Subtitle>
        <Description>
          {aboutContent.education && aboutContent.education.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Description>
      </Content>
    </AboutContainer>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSpinner, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

// Styled components
const ProjectsContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 80px 20px;
  background: #0a0a0a;
  color: #fff;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ProjectCard = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${props => (props.active ? '#00ff88' : '#1a1a1a')};
  color: ${props => (props.active ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${props => (props.active ? '#00cc6a' : '#333')};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

const Loader = styled.div`
  color: #00ff88;
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: none;
  gap: 10px;

  ${ProjectCard}:hover & {
    display: flex;
  }
`;

const IconLink = styled.a`
  color: #00ff88;
  font-size: 20px;
  transition: color 0.3s;

  &:hover {
    color: #00cc6a;
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch projects and categories on component mount
  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error('Unexpected data format for projects:', data);
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data.map(cat => cat.name));
      } else {
        console.error('Unexpected data format for categories:', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  };

  // Update filtered projects when filter, projects, or search term change
  useEffect(() => {
    let updatedProjects = projects;

    if (filter !== 'all') {
      updatedProjects = updatedProjects.filter(project => project.category === filter);
    }

    if (searchTerm) {
      updatedProjects = updatedProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(updatedProjects);
  }, [filter, projects, searchTerm]);

  return (
    <ProjectsContainer>
      <h1>My Projects</h1>

      <SearchInput
        type="text"
        placeholder="Search for a project..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FilterContainer>
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ProjectGrid>
          {Array.isArray(filteredProjects) && filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              {project.imageUrl && (
                <ProjectImage src={project.imageUrl} alt={project.title} />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <IconContainer>
                {project.codeUrl && (
                  <IconLink href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <FaCode />
                  </IconLink>
                )}
                {project.liveUrl && (
                  <IconLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </IconLink>
                )}
              </IconContainer>
            </ProjectCard>
          ))}
        </ProjectGrid>
      )}
    </ProjectsContainer>
  );
};

export default Projects;

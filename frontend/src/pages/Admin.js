import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ActivityLogs from '../components/ActivityLogs';
import AdminProfile from '../components/AdminProfile';
import DashboardCharts from '../components/DashboardCharts';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaUser, FaChartBar, FaProjectDiagram, FaTags, FaUserCog, FaClipboardList, FaEnvelope, FaEdit, FaTrash } from 'react-icons/fa';

// Chart.js bileşenlerini kaydet
Chart.register(...registerables);

const AdminContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 20px;
  background: #0a0a0a;
  color: white;
`;

const AdminPanel = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 0 0 10px 0;
`;

const StatCard = styled.div`
  background: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: white;
  text-align: center;
  
  h3 {
    font-size: 24px;
    margin-bottom: 5px;
    color: #00ff88;
  }
  
  p {
    font-size: 12px;
    margin: 0;
    color: #ffffff;
  }
`;

const RecentProjects = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  
  h3 {
    color: #00ff88;
    margin-bottom: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
  min-height: 100px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #00ff88;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  
  &:hover {
    background: #00cc6a;
  }
`;

const TableContainer = styled.div`
  background: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #333;
  }
  
  th {
    color: #00ff88;
  }
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &.edit {
    background: #ffd700;
    color: black;
  }
  
  &.delete {
    background: #ff4444;
    color: white;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background: ${props => props.active ? '#00ff88' : '#1a1a1a'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 8px;
`;

const LoginInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
`;

const LoginButton = styled.button`
  padding: 10px;
  background: #00ff88;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  
  &:hover {
    background: #00cc6a;
  }
`;

const AboutContainer = styled.div`
  margin-bottom: 30px;
`;

const AboutTitle = styled.h2`
  color: #00ff88;
  margin-bottom: 15px;
`;

const AboutText = styled.p`
  background: #1a1a1a;
  padding: 15px;
  border-radius: 5px;
`;

const AboutInput = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
  min-height: 100px;
  margin-bottom: 15px;

  &:focus {
    border-color: #00ff88;
    outline: none;
  }
`;

const Description = styled.p`
  background: #1a1a1a;
  padding: 15px;
  border-radius: 5px;
`;

const MessageCard = styled.div`
    background: #1a1a1a;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px;
`;

const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1.1rem;
`;

const MessageBody = styled.p`
    color: #fff;
    margin: 0;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const DeleteButton = styled.button`
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background: #ff0000;
    }
`;

const Admin = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCategories: 0,
    totalMessages: 0,
    recentProjects: [],
    projectsByCategory: [],
  });
  
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    codeUrl: '',
    liveUrl: ''
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [activityLogs, setActivityLogs] = useState([]);
  const [adminProfile, setAdminProfile] = useState(null);
  const [aboutContent, setAboutContent] = useState({});
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newLink, setNewLink] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchCategories();
    fetchProjects();
    fetchActivityLogs();
    fetchAbout();
    fetchMessages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/stats/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/activity-logs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setActivityLogs(data);
    } catch (error) {
      console.error('Error loading activity logs:', error);
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/about`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setAboutContent(data);
      console.log(data);
    } catch (error) {
      console.error('Error loading about information:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/messages`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(passwordData)
      });

      if (response.ok) {
        alert('Password updated successfully');
        fetchActivityLogs();
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      alert('An error occurred while updating the password');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCategory 
        ? `${process.env.REACT_APP_BASE_URL}/api/categories/${editingCategory._id}`
        : `${process.env.REACT_APP_BASE_URL}/api/categories`;

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ name: newCategory })
      });

      if (response.ok) {
        setNewCategory('');
        setEditingCategory(null);
        fetchCategories();
        fetchStats();
      } else {
        console.error('Error adding category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        fetchCategories();
        fetchStats();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProject 
        ? `${process.env.REACT_APP_BASE_URL}/api/projects/${editingProject._id}`
        : `${process.env.REACT_APP_BASE_URL}/api/projects`;

      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        setNewProject({
          title: '',
          description: '',
          category: '',
          imageUrl: '',
          codeUrl: '',
          liveUrl: ''
        });
        setEditingProject(null);
        fetchStats();
      } else {
        console.error('Error adding project:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects/${projectId}`, {
          method: 'DELETE',
        });
        setProjects(projects.filter(project => project._id !== projectId));
        fetchStats();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginData);
    if (!success) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleAboutUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(aboutContent)
      });

      if (response.ok) {
        alert('About information updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error updating information: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating About information:', error);
    }
  };

  const handleSkillChange = (categoryIndex, skillIndex, value) => {
    const updatedSkills = [...aboutContent.skills];
    updatedSkills[categoryIndex].skills[skillIndex] = value;
    setAboutContent({ ...aboutContent, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    const updatedSkills = [...aboutContent.skills];
    const categoryIndex = updatedSkills.findIndex(category => category.category === newSkillCategory);

    if (categoryIndex !== -1) {
        updatedSkills[categoryIndex].skills.push(newSkill);
    } else {
        updatedSkills.push({
            category: newSkillCategory,
            skills: [newSkill]
        });
    }

    setAboutContent({ ...aboutContent, skills: updatedSkills });
    setNewSkill('');
    setNewSkillCategory('');
  };

  const handleDeleteSkillCategory = (categoryIndex) => {
    const updatedSkills = [...aboutContent.skills];
    updatedSkills.splice(categoryIndex, 1);
    setAboutContent({ ...aboutContent, skills: updatedSkills });
  };

  const handleDeleteSkill = (categoryIndex, skillIndex) => {
    const updatedSkills = [...aboutContent.skills];
    updatedSkills[categoryIndex].skills.splice(skillIndex, 1);
    setAboutContent({ ...aboutContent, skills: updatedSkills });
  };

  const handleAddLink = () => {
    const updatedLinks = [...aboutContent.contactLinks, newLink];
    setAboutContent({ ...aboutContent, contactLinks: updatedLinks });
    setNewLink('');
  };

  const handleDeleteLink = (linkIndex) => {
    const updatedLinks = aboutContent.contactLinks.filter((_, index) => index !== linkIndex);
    setAboutContent({ ...aboutContent, contactLinks: updatedLinks });
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      setMessages(messages.filter(msg => msg._id !== messageId));
      fetchStats();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2 style={{ color: '#00ff88', textAlign: 'center' }}>Admin Login</h2>
          <LoginInput
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <LoginInput
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminPanel>
        <TabContainer>
          <TabButton 
            active={activeTab === 'about'} 
            onClick={() => setActiveTab('about')}
          >
            <FaUser style={{ marginRight: '5px' }} /> About Me
          </TabButton>
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar style={{ marginRight: '5px' }} /> Dashboard
          </TabButton>
          <TabButton 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          >
            <FaProjectDiagram style={{ marginRight: '5px' }} /> Projects
          </TabButton>
          <TabButton 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')}
          >
            <FaTags style={{ marginRight: '5px' }} /> Categories
          </TabButton>
          <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            <FaUserCog style={{ marginRight: '5px' }} /> Profile
          </TabButton>
          <TabButton 
            active={activeTab === 'logs'} 
            onClick={() => setActiveTab('logs')}
          >
            <FaClipboardList style={{ marginRight: '5px' }} /> Activity Logs
          </TabButton>
          <TabButton 
            active={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')}
          >
            <FaEnvelope style={{ marginRight: '5px' }} /> Messages
          </TabButton>
        </TabContainer>

        {activeTab === 'about' && (
          <AboutContainer>
            <AboutTitle>{aboutContent.title}</AboutTitle>
            <AboutInput 
              value={aboutContent.description}
              onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
              placeholder="Enter about information..."
            />
            
            <h3>Contact Links</h3>
            <Form onSubmit={(e) => { e.preventDefault(); handleAddLink(); }}>
                <Input 
                    type="text" 
                    placeholder="New Contact Link" 
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                />
                <Button type="submit">Add Link</Button>
            </Form>
            <ul>
                {aboutContent.contactLinks && aboutContent.contactLinks.map((link, index) => (
                    <li key={index}>
                        <input 
                            type="text" 
                            value={link} 
                            onChange={(e) => {
                                const updatedLinks = [...aboutContent.contactLinks];
                                updatedLinks[index] = e.target.value;
                                setAboutContent({ ...aboutContent, contactLinks: updatedLinks });
                            }} 
                        />
                        <button onClick={() => handleDeleteLink(index)}>Delete Link</button>
                    </li>
                ))}
            </ul>

            <h3>Skills</h3>
            {aboutContent.skills && aboutContent.skills.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    <h4>{category.category}</h4>
                    <button onClick={() => handleDeleteSkillCategory(categoryIndex)}>Delete Category</button>
                    <ul>
                        {category.skills.map((skill, skillIndex) => (
                            <li key={skillIndex}>
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleSkillChange(categoryIndex, skillIndex, e.target.value)}
                                />
                                <button onClick={() => handleDeleteSkill(categoryIndex, skillIndex)}>Delete Skill</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <h3>Experience</h3>
            <Description>
              <textarea 
                value={aboutContent.experience}
                onChange={(e) => setAboutContent({ ...aboutContent, experience: e.target.value })}
              />
            </Description>

            <h3>Education</h3>
            <Description>
              <textarea 
                value={aboutContent.education}
                onChange={(e) => setAboutContent({ ...aboutContent, education: e.target.value })}
              />
            </Description>

            <Form onSubmit={(e) => { e.preventDefault(); handleAddSkill(); }}>
                <Input 
                    type="text" 
                    placeholder="Skill Category" 
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                />
                <Input 
                    type="text" 
                    placeholder="New Skill" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button type="submit">Add Skill</Button>
            </Form>

            <button onClick={handleAboutUpdate} style={{ background: '#00ff88', color: '#000', padding: '10px', border: 'none', borderRadius: '5px' }}>
              Save Changes
            </button>
          </AboutContainer>
        )}

        {activeTab === 'dashboard' && (
          <>
            <DashboardStats>
              <StatCard>
                <h3>{stats.totalProjects}</h3>
                <p>Total Projects</p>
              </StatCard>
              <StatCard>
                <h3>{stats.totalCategories}</h3>
                <p>Total Categories</p>
              </StatCard>
              <StatCard>
                <h3>{stats.totalMessages}</h3>
                <p>Total Messages</p>
              </StatCard>
            </DashboardStats>

            <h2>Project Category Distribution</h2>
            <Bar
              data={{
                labels: stats.projectsByCategory.map(cat => cat._id),
                datasets: [{
                  label: 'Project Count',
                  data: stats.projectsByCategory.map(cat => cat.count),
                  backgroundColor: 'rgba(0, 255, 136, 0.6)',
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Project Category Distribution'
                  }
                }
              }}
            />

            <h2>Recently Added Projects</h2>
            <Pie
              data={{
                labels: stats.recentProjects.map(project => project.title),
                datasets: [{
                  label: 'Recently Added Projects',
                  data: stats.recentProjects.map(project => project.category),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                  ],
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Recently Added Projects'
                  }
                }
              }}
            />
          </>
        )}

        {activeTab === 'projects' && (
          <>
            <RecentProjects>
              <h3>Recently Added Projects</h3>
              <ul>
                {stats.recentProjects.map(project => (
                  <li key={project._id}>
                    <span>{project.title}</span>
                    <span>{new Date(project.createdAt).toLocaleDateString('tr-TR')}</span>
                  </li>
                ))}
              </ul>
            </RecentProjects>

            <h2>Project Management</h2>
            <Input 
              type="text" 
              placeholder="Project Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Form onSubmit={handleProjectSubmit}>
              <Input 
                type="text" 
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              />
              <TextArea 
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              />
              <Select
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Input 
                type="text" 
                placeholder="Image URL"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
              />
              <Input 
                type="text" 
                placeholder="Code URL"
                value={newProject.codeUrl}
                onChange={(e) => setNewProject({...newProject, codeUrl: e.target.value})}
              />
              <Input 
                type="text" 
                placeholder="Live URL"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
              />
              <Button type="submit">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </Form>

            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Project Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredProjects.length > 0 ? filteredProjects : projects).map(project => (
                    <tr key={project._id}>
                      <td>{project.title}</td>
                      <td>{project.category}</td>
                      <td>
                        <ActionButton 
                          className="edit"
                          onClick={() => {
                            setEditingProject(project);
                            setNewProject({
                              title: project.title,
                              description: project.description,
                              category: project.category,
                              imageUrl: project.imageUrl,
                              codeUrl: project.codeUrl,
                              liveUrl: project.liveUrl
                            });
                          }}
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton 
                          className="delete"
                          onClick={() => deleteProject(project._id)}
                        >
                          <FaTrash />
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </>
        )}

        {activeTab === 'categories' && (
          <>
            <h2>Category Management</h2>
            <Form onSubmit={handleCategorySubmit}>
              <Input 
                type="text" 
                placeholder="Category Name" 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button type="submit">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </Form>

            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <ActionButton 
                          className="edit"
                          onClick={() => {
                            setEditingCategory(category);
                            setNewCategory(category.name);
                          }}
                        >
                          Edit
                        </ActionButton>
                        <ActionButton 
                          className="delete"
                          onClick={() => deleteCategory(category._id)}
                        >
                          Delete
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </>
        )}

        {activeTab === 'profile' && (
          <AdminProfile 
            admin={adminProfile}
            onUpdate={handlePasswordChange}
          />
        )}

        {activeTab === 'logs' && (
          <ActivityLogs logs={activityLogs} />
        )}

        {activeTab === 'messages' && (
          <>
            <h3>Messages</h3>
            {messages.map((msg, index) => (
              <MessageCard key={index}>
                <MessageHeader>
                  <strong>{msg.name}</strong> ({msg.email})
                  <DeleteButton onClick={() => handleDeleteMessage(msg._id)}>Delete</DeleteButton>
                </MessageHeader>
                <MessageBody>{msg.message}</MessageBody>
              </MessageCard>
            ))}
          </>
        )}
      </AdminPanel>
    </AdminContainer>
  );
};

export default Admin; 
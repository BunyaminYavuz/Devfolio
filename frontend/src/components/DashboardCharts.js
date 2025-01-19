import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatBox = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const StatTitle = styled.h3`
  color: #00ff88;
  margin-bottom: 15px;
  font-size: 18px;
`;

const StatValue = styled.div`
  font-size: 32px;
  color: white;
  margin-bottom: 10px;
`;

const StatChange = styled.div`
  color: ${props => props.isPositive ? '#00ff88' : '#ff4444'};
  font-size: 14px;
`;

const DashboardStats = ({ projectData, categoryData }) => {
  // Son 7 günün verilerini göster
  const getWeeklyStats = (data) => {
    if (!data || !data.values || !data.labels) return { current: 0, change: 0 };
    
    const values = data.values;
    const current = values[values.length - 1] || 0;
    const previous = values[values.length - 2] || 0;
    const change = ((current - previous) / previous * 100) || 0;
    
    return { current, change };
  };

  const projectStats = getWeeklyStats(projectData);
  const categoryStats = getWeeklyStats(categoryData);

  return (
    <StatsContainer>
      <StatBox>
        <StatTitle>Weekly Project Statistics</StatTitle>
        <StatValue>{projectStats.current}</StatValue>
        <StatChange isPositive={projectStats.change >= 0}>
          {projectStats.change > 0 ? '↑' : '↓'} {Math.abs(projectStats.change).toFixed(1)}%
        </StatChange>
      </StatBox>
      
      <StatBox>
        <StatTitle>Weekly Category Statistics</StatTitle>
        <StatValue>{categoryStats.current}</StatValue>
        <StatChange isPositive={categoryStats.change >= 0}>
          {categoryStats.change > 0 ? '↑' : '↓'} {Math.abs(categoryStats.change).toFixed(1)}%
        </StatChange>
      </StatBox>

      <StatBox>
        <StatTitle>Most Active Category</StatTitle>
        <StatValue>
          {categoryData?.labels?.[0] || 'No Data'}
        </StatValue>
      </StatBox>

      <StatBox>
        <StatTitle>Total Statistics</StatTitle>
        <StatValue>
          {(projectData?.values || []).reduce((a, b) => a + b, 0)} Projects
        </StatValue>
        <StatValue>
          {(categoryData?.values || []).reduce((a, b) => a + b, 0)} Categories
        </StatValue>
      </StatBox>
    </StatsContainer>
  );
};

export default DashboardStats; 
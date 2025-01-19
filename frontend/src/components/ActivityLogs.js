import React from 'react';
import styled from 'styled-components';

const LogContainer = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const LogTitle = styled.h3`
  color: #00ff88;
  margin-bottom: 15px;
`;

const LogTable = styled.table`
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

const LogEntry = styled.tr`
  &:hover {
    background: #2a2a2a;
  }
`;

const ActivityLogs = ({ logs }) => {
  return (
    <LogContainer>
      <LogTitle>Activity Logs</LogTitle>
      <LogTable>
        <thead>
          <tr>
            <th>Date</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Source</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <LogEntry key={log._id}>
              <td>{new Date(log.createdAt).toLocaleString('en-US')}</td>
              <td>{log.adminId.username}</td>
              <td>{log.action}</td>
              <td>{log.resourceType}</td>
              <td>{JSON.stringify(log.details)}</td>
            </LogEntry>
          ))}
        </tbody>
      </LogTable>
    </LogContainer>
  );
};

export default ActivityLogs; 
import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background: #1a1a1a;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 50px auto;
`;

const ProfileTitle = styled.h3`
  color: #00ff88;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: white;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #00ff88;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px;
  background: #00ff88;
  border: none;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #00cc6a;
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  color: #ff4444;
  text-align: center;
  font-size: 14px;
`;

const AdminProfile = ({ onUpdate }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match!');
      return;
    }
    
    try {
      await onUpdate({ currentPassword: password, newPassword });
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Profile updated successfully!');
    } catch (error) {
      setErrorMessage('An error occurred while updating the profile!');
    }
  };

  return (
    <ProfileContainer>
      <ProfileTitle>Profile Settings</ProfileTitle>
      <ProfileForm onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password (Repeat)"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <Message>{errorMessage}</Message>}
        <Button type="submit">Update Profile</Button>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default AdminProfile; 
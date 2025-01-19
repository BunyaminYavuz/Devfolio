import React, { useState } from 'react';
import axios from 'axios';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/request-reset`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending reset email. Please try again.');
    }
  };

  return (
    <div>
      <h1>Request Password Reset</h1>
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestReset; 
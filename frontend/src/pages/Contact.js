import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 80px 20px;
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactForm = styled.form`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #fff;
  font-size: 1.1rem;
  min-height: 200px;
  width: 100%;
`;

const Button = styled.button`
  padding: 15px 25px;
  background: #00ff88;
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: #00cc6a;
  }
`;

const Message = styled.div`
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
  text-align: center;
  background: ${props => props.error ? '#ff4444' : '#00ff88'};
  color: ${props => props.error ? '#fff' : '#000'};
  font-size: 1.2rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', error: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
        setStatus({
            message: 'Please fill in all fields.',
            error: true
        });
        return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus({
                message: 'Your message has been sent successfully!',
                error: false
            });
            // Clear the form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } else {
            const error = await response.json();
            setStatus({
                message: `Error: ${error.message}`,
                error: true
            });
        }
    } catch (error) {
        setStatus({
            message: 'An error occurred. Please try again.',
            error: true
        });
    }
  };

  return (
    <ContactContainer>
      <ContactForm onSubmit={handleSubmit}>
        <h1 style={{ color: '#fff', textAlign: 'center', fontSize: '2.5rem' }}>Contact</h1>
        <Input 
          type="text" 
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input 
          type="email" 
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <TextArea 
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit">Send</Button>
        {status.message && (
          <Message error={status.error}>
            {status.message}
          </Message>
        )}
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;

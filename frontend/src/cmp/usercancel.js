import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const UserCancel = () => {
  const [reason, setReason] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const location = useLocation();
  const taskDetails = location.state;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        reason,
        ...taskDetails
      };

      const response = await fetch('http://localhost:4000/usercancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        navigate('/userpending');
      } else {
        setResponseMessage('An error occurred while submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while submitting the form');
    }
  };

  return (
    <div className="container-fluid bg-secondary" style={{ width: '100%', height: '100vh', padding: '5rem' }}>
      
      <h2 className="text-center mb-4">Cancellation Form</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cancellationReason">
          <h3><Form.Label>Please give us a valid reason for cancellation:</Form.Label></h3>
          <Form.Control
            as="textarea"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="my-2"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserCancel;

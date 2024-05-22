import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import logo from '../logo.jpeg';
import { Link } from 'react-router-dom';
const TaskerCancel = () => {
  const [reason, setReason] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const location = useLocation();
  const taskDetails1 = location.state;
  const navigate = useNavigate();
  // Log the taskDetails to the console
  console.log('Passed data:', taskDetails1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        reason,
        ...taskDetails1 // Spread taskDetails into the request body
      };

      const response = await fetch('http://localhost:4000/taskercancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
         navigate('/taskerprofile')
      } else {
        // Handle error responses from the server
        setResponseMessage('An error occurred while submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while submitting the form');
    }
  };

  return (
    <>
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/taskerprofile" className='text-decoration-none text-white'>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            JobJunction
            </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Link to='/' className='text-decoration-none'>
            <button type="submit" className="btn btn-danger btn-lg">LogOut</button></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="container mt-5 bg-dark text-white">
      <h2 className="mb-4">Cancellation Form</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cancellationReason">
          <Form.Label>Please give us a valid reason for cancellation:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
};

export default TaskerCancel;

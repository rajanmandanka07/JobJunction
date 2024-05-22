import React from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import {  useNavigate ,Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import logo from '../logo.jpeg';
const Searchresults = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  let taskDetails = location.state;
  const [query, setQuery] = useState('');
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/search?q=${query}`);
      const data = await response.json();
      console.log(data);
      Navigate('/searchedresults',{state:data})
    } catch (error) {
      console.error('Error searching tasks', error);
    }
  };
  return (
    <>
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/UserHome" className='text-decoration-none text-white'>
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
          <Form className="d-flex">
            <Form.Control
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="btn btn-info btn-lg" onClick={handleSearch}>Search</Button>
            <Link to='/' className='text-decoration-none'>
            <button type="submit" className="btn btn-danger btn-lg">LogOut</button></Link>
            <Link to='/userprofile' className='text-decoration-none'>
            <button type="submit" className="btn btn-info btn-lg">Profile</button></Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='container-fluid bg-dark text-white px-5'>
    <Link to="/UserHome" className='text-decoration-none text-white btn btn-primary my-2'>Back</Link>
      {taskDetails.map((task, index) => (
        index % 4 === 0 && (
          <Row key={index}>
            {taskDetails.slice(index, index + 4).map((task, subIndex) => (
              <Col md={3} key={subIndex} className='mb-3'>
                <Card className="mb-3" style={{ width: '100%', height: '100%' }}>
                  <div className="card-body">
                    <h5 className="card-title">{task.task}</h5>
                    <p className="card-text">Category: {task.category}</p>
                    <p className="card-text">Price: {task.price}</p>
                    <Button className='btn btn-primary'  onClick={() => Navigate('/bookingform', { state: {taskName :`${task.task}`, taskPrice :`${task.price}`  } })}>Book Now !</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      ))}
    </div>
    </>
  );
};

export default Searchresults;

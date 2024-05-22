import React from 'react';
import Pendingwork from './pendingwork';
import Completedwork from './completedwork';
import { Navbar,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const WorktaskerMain = () => {
  return (
    <div className='bg-dark text-white'>
      <Navbar bg="secondary" expand="lg" className="mb-4 text-whie">
          <Container fluid> {/* Use fluid container for full-width */}
            <Navbar.Brand href="#home">
              <img
                alt=''
                src="../logo.jpeg" //
                width="30"
                height="30"
                className="d-inline-block align-top text-white"
              />{' '}
              JobJunction
            </Navbar.Brand>
            <Link to='/' className='text-decoration-none'>
              <button type="button" className="btn btn-danger btn-lg">LogOut</button>
            </Link>
          </Container>
        </Navbar>
    <div className="container">
      <div className="row">
        <div className="col-12 bg-black text-white py-2 text-center">
          Pending Work
        </div>
      </div>
      <div className='my-3'>
        <div>
          <Pendingwork/>
        </div>
        <div className="row">
        <div className="col-12 bg-black text-white py-2 text-center">
         Completed Works
        </div>
     
        <div >
              <Completedwork/>
        </div>
      </div>
      </div>
       </div>
       </div>
  );
};

export default WorktaskerMain;

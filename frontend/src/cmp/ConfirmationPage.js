import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const responseData = location.state.responseData;
  const data = responseData[0];

  return (
    <div className="bg-light py-4 min-vh-100 d-flex align-items-center bg-dark text-white">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={10}> {/* Set the width to 10 on xl screens */}
          <div className="text-center">
            <h2>Booking Confirmation</h2>
            <p className="mt-3">Thank you for booking our service!</p>
            <p>Your booking has been confirmed.</p>
          </div>
          <div className="mt-5">
            <h4>Booking Details:</h4>
            <div>
              <p><strong>Tasker Name: </strong> {data.taskername}</p>
              <p><strong>Tasker Phone: </strong> {data.taskerphone}</p>
              <p><strong>Task Name: </strong> {data.taskname}</p>
              <p><strong>Task Price: </strong> RS: {data.taskprice}</p>
              <p><strong>Task Slot: </strong> {data.taskslot}</p>
              <p><strong>Task Date: </strong> {data.taskdate}</p>
            </div>
          </div>
          <Link to='/Userhome' className='text-decoration-none mt-3 mx-3'>
            <button type="button" className="btn btn-secondary">Explore Other Services</button>
          </Link>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ConfirmationPage;

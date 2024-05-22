import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const DiscountCoupon = () => {
  const [usercoupons, setUsercoupons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('http://localhost:4000/getnotifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data && data.userCoupons) {
          setUsercoupons(data.userCoupons);
        } else {
          setUsercoupons([]);
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCoupons();
  }, [userId]);

  return (
    <Container fluid style={{ width: '100%', height: '100vh', padding: '5rem' }} className='bg-secondary'>
      <h3 className="card-title text-center text-dark">Your task has been canceled by our tasker. We apologize for the inconvenience. Please use this coupon to get the same service at a 20% discount.</h3>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ navigate('/userprofile')}}>
        Back
      </Button>
      {usercoupons.map((coupon, index) => (
        index % 4 === 0 && (
          <Row key={index}>
            {usercoupons.slice(index, index + 4).map((coupon, subIndex) => (
              <Col md={3} key={subIndex} className='mb-3'>
                <Card className="mb-3" style={{ width: '100%', height: '100%' }}>
                  <div className="card-body">    
                    <h5 className="card-title">{coupon.taskname}</h5>
                    <p className="card-text">Task Date: {coupon.taskdate.substring(0, 10)}</p>
                    <p className="card-text">Task Slot: {coupon.taskslot}</p>
                    <p className="card-text">Tasker Name: {coupon.taskername}</p>
                    <p className="card-text"> Discounted Price: {coupon.taskprice}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/couponbooking", { state: coupon })}
                    >
                      Redeem Now !
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      ))}
      
    </Container>
  );
};

export default DiscountCoupon;

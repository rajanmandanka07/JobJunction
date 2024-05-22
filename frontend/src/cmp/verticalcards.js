import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Import Card, Col, and Row components from react-bootstrap

const VerticalCardList = () => {
    const cardsData = [
        {
          title: 'Morning Cleaning Session',
          image: '/images/morning-cleaning.jpg', // Replace with the path to your image
          description: '20 square meters, Single bed setup, 1 cleaner. No cancellations, refreshments included.',
          price: '$50'
        },
        {
          title: 'Evening Cleaning Session',
          image: '/images/evening-cleaning.jpg', // Replace with the path to your image
          description: 'Lorem ipsum, Lorem ipsum apartment, Lorem ipsum.',
          price: null // No price displayed
        },
        {
          title: 'Experienced Cleaning Professionals',
          image: '/images/professional-cleaning.jpg', // Replace with the path to your image
          description: '50 sqm cleanings, 2 Bedroom house. No cancellations, Cleaning materials included.',
          price: null // No price displayed
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', // Replace with the path to your image
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null // No price displayed
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', // Replace with the path to your image
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null // No price displayed
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', // Replace with the path to your image
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null // No price displayed
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', // Replace with the path to your image
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null // No price displayed
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', // Replace with the path to your image
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null // No price displayed
        },
        // Add more card objects as needed
      ];

    return (
        <Row>
            {cardsData.map((card, index) => (
                <Col md={3} key={index}>
                    <Card className="mb-3">
                        {/* <Card.Img variant="top" src={card.image} alt={card.title} /> */}
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default VerticalCardList;

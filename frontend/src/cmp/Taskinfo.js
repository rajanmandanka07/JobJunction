import React from 'react';
import { Button, Card } from 'react-bootstrap'; 

const Taskinfo = () => {
    const cardsData = [
        {
          title: 'Morning Cleaning Session',
          image: '/images/morning-cleaning.jpg', 
          description: '20 square meters, Single bed setup, 1 cleaner. No cancellations, refreshments included.',
          price: '$50'
        },
        {
          title: 'Evening Cleaning Session',
          image: '/images/evening-cleaning.jpg', 
          description: 'Lorem ipsum, Lorem ipsum apartment, Lorem ipsum.',
          price: null 
        },
        {
          title: 'Experienced Cleaning Professionals',
          image: '/images/professional-cleaning.jpg', 
          description: '50 sqm cleanings, 2 Bedroom house. No cancellations, Cleaning materials included.',
          price: null
        },
        {
          title: 'Premium House Cleaning Service',
          image: '/images/premium-cleaning.jpg', 
          description: '100 sqm cleaning, Superior kitchen-cleaning.',
          price: null 
        }
       
      ];

    return (
        <div className="scrollable-cards-container d-flex flex-row flex-nowrap overflow-auto">
          {cardsData.map((card, index) => (
            <Card key={index} className="bg-light rounded p-3 shadow-sm m-2" style={{ width: '18rem' }}>
              {/* <Card.Img variant="top" src={card.image} alt={card.title} /> */}
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Button variant="danger">Book now</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
    );
};

export default Taskinfo;

import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Pendingwork = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/userpending', {
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

        if (data && data.userPendingTasks) {
          setPendingTasks(data.userPendingTasks);
        } else {
          setPendingTasks([]);
        }
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
      }
    };

    fetchPendingTasks();
  }, [userId]);

  return (
    <Container fluid style={{ width: '100%', height: '100vh', padding: '5rem' }} className='bg-secondary'>
      <h1 className="display-3 text-white py-4 text-dark">Pending Work</h1>
      <Button className='btn btn-dark border-rounded mb-3' onClick={() => navigate('/userprofile')}>
        Back
      </Button>
      {pendingTasks.map((task, index) => (
        index % 4 === 0 && (
          <Row key={index} className='mb-3'>
            {pendingTasks.slice(index, index + 4).map((task, subIndex) => (
              <Col md={3} key={subIndex}>
                <Card className="mb-3" style={{ width: '100%', height: '100%', backgroundColor: '#f8f9fa' }}>
                  <div className="card-body">
                    <h5 className="card-title">{task.taskname}</h5>
                    <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
                    <p className="card-text">Task Slot: {task.taskslot}</p>
                    <p className="card-text">Tasker Name: {task.taskername}</p>
                    <p className="card-text">Tasker Phone: {task.taskerphone}</p>
                    <p className="card-text">Task Price: {task.taskprice}</p>
                    <Button
                      className="btn btn-primary"
                      onClick={() => navigate("/usercancel", { state: { taskname: task.taskname, taskdate: task.taskdate, taskslot: task.taskslot, userId, taskerId: task.taskerId, taskprice: task.taskprice } })}
                    >
                      Cancel
                    </Button>
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

export default Pendingwork;

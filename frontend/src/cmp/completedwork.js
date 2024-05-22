import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const UserCompletedwork = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/usercompleted', {
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

        if (data && data.userCompletedTasks) {
          setCompletedTasks(data.userCompletedTasks);
        } else {
          setCompletedTasks([]);
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCompletedTasks();
  }, [userId]);

  return (
    <div className="container-fluid  bg-secondary" style={{ width: '100%', height: '100%', padding: '5rem' }}>
      <h1 className="display-3 font-bold py-4 text-dark">Completed Work</h1>
      <Button className='btn btn-dark border-rounded mb-3' onClick={() => navigate('/userprofile')}>
        Back
      </Button>
      {completedTasks.map((task, index) => (
        index % 4 === 0 && (
          <Row key={index} className='mb-3'>
            {completedTasks.slice(index, index + 4).map((task, subIndex) => (
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
                      className={`btn ${task.review === 'YES' ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => {
                        if (task.review === 'NO') {
                          console.log(task.review);
                          navigate("/userreviewform", { state: task });
                        }
                      }}
                      disabled={task.review === 'YES'}
                    >
                      {task.review === 'NO' ? 'Give Review' : 'Already Reviewed'}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      ))}
    </div>
  );
};

export default UserCompletedwork;

import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskerPendingWork = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const location = useLocation();
  const taskerId = location.state;
  const navigate = useNavigate();

  // Function to complete a task
  const completeTask = async (task) => {
    const reqbody = {
      taskerId,
      userphone: task.userphone,
      username: task.username,
      useraddress: task.useraddress,
      taskname: task.taskname,
      taskprice: task.taskprice,
      taskslot: task.taskslot,
      taskdate: task.taskdate,
      userId: task.userId,
    };
    try {
      const response = await fetch('http://localhost:4000/taskerconfirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqbody),
      });
      if (!response.ok) {
        throw new Error('Failed to mark task as completed');
      }
      // Refetch pending tasks after completing a task
      fetchPendingTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  // Function to fetch pending tasks
  const fetchPendingTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/taskerpending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskerId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data && data.taskerPendingTasks) {
        setPendingTasks(data.taskerPendingTasks);
      } else {
        setPendingTasks([]);
      }
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
    }
  };

  // Effect to fetch pending tasks initially and reload every 10 seconds
  useEffect(() => {
    fetchPendingTasks();

    // Reload pending tasks every 10 seconds
  }, [taskerId]); // Include fetchPendingTasks in the dependency array

  return (
    <Container style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}>
      <Button className="btn btn-dark border-rounded mb-3" onClick={() => { navigate('/taskerprofile') }}>
        Back
      </Button>
      {pendingTasks.map((task, index) => (
        // Check if the index is divisible by 4 to start a new row
        index % 4 === 0 && (
          <Row key={index} className="mb-4">
            {pendingTasks.slice(index, index + 4).map((task, subIndex) => (
              <Col lg={3} md={6} sm={12} key={subIndex} className="mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{task.taskname}</h5>
                    <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
                    <p className="card-text">Task Slot: {task.taskslot}</p>
                    <p className="card-text">User Name: {task.username}</p>
                    <p className="card-text">User Phone: {task.userphone}</p>
                    <p className="card-text">Task Price: {task.taskprice}</p>
                    <p className="card-text">User Address: {task.useraddress}</p>
                    <Button className="btn btn-primary mr-2" onClick={() => completeTask(task)}>Complete</Button>
                    <Button className="btn btn-danger" onClick={() => navigate("/taskercancel", { state: { taskname: task.taskname, taskdate: task.taskdate, taskslot: task.taskslot, userId: task.userId, taskerId: task.taskerId, taskprice: task.taskprice, username: task.username, userphone: task.userphone, useraddress: task.useraddress } })}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )
      ))}
    </Container>
  );
};

export default TaskerPendingWork;

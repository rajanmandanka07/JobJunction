import React, { useState, useEffect } from 'react';
import {  Col, Row,Container,Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TaskerCompletedWork = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const location = useLocation()
  const taskerId = location.state
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/taskercompleted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskerId })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data && data.taskerCompletedTasks) {
          setCompletedTasks(data.taskerCompletedTasks); 
        } else {
          setCompletedTasks([]); 
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };
  
    fetchCompletedTasks();
  }, [taskerId]);
  

  useEffect(() => {
    console.log(completedTasks); // Log pendingTasks whenever it changes
  }, [completedTasks]); // Run this effect whenever pendingTasks changes

  return (
    <Container>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskerprofile')}}>
      Back
      </Button>
  {completedTasks.map((task, index) => (
    // Check if the index is divisible by 4 to start a new row
    index % 4 === 0 && (
      <Row key={index} className="mb-4">
        {completedTasks.slice(index, index + 4).map((task, subIndex) => (
          <Col lg={3} md={6} sm={12} key={subIndex} className='mb-4'>
            <div className="card" style={{ width: '100%', height: '100%' }}>
            <div className="card-body">
 <h5 className="card-title">{task.taskname}</h5>
 <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
 <p className="card-text">Task Slot: {task.taskslot}</p>
 <p className="card-text">User Name: {task.username}</p>
 <p className="card-text">User Phone: {task.userphone}</p>
 <p className="card-text">Task Price: {task.taskprice}</p>
 <p className="card-text">User Address: {task.useraddress}</p>
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

export default TaskerCompletedWork;

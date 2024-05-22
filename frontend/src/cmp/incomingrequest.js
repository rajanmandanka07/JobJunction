import React, { useState, useEffect } from 'react';
import {  Col,Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const IncomingRequest = () => {
    const location = useLocation()
  const taskerId = location.state
    const [tasks, setTasks] = useState([]); // State to hold MongoDB data
    const navigate = useNavigate();
    const fetchTasks = async () => {
        try {
            // Make a POST request to fetch tasks from MongoDB
            const response = await fetch('http://localhost:4000/get-incoming', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskerId }) // Send taskerId in the request body
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            // Set the fetched tasks to the state
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        // Call fetchTasks initially when the component mounts
        fetchTasks();

        // Set interval to fetch tasks every 1 minute
        const intervalId = setInterval(fetchTasks, 30000); // 60000 milliseconds = 1 minute

        // Clear interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [taskerId,fetchTasks]); // Dependency on taskerId so that it refetches data when taskerId changes

    const handleAccept = async (taskId) => {
        try {
            // Make a POST request to confirm the task
            const response = await fetch('http://localhost:4000/give-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestId: taskId, confirm: "true" }) // Send taskId and confirm: true
            });
            if (!response.ok) {
                throw new Error('Failed to confirm task');
            }
            navigate('/taskerprofile')
        } catch (error) {
            console.error('Error confirming task:', error);
        }
    };

    const handleCancel = async (taskId) => {
        try {
            // Make a POST request to cancel the task
            const response = await fetch('http://localhost:4000/give-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestId: taskId, confirm: "false" }) // Send taskId and confirm: false
            });
            if (!response.ok) {
                throw new Error('Failed to cancel task');
            }
            navigate('/taskerprofile')
        } catch (error) {
            console.error('Error cancelling task:', error);
        }
    };

    return (
        <>
            <div className="container-fluid bg-dark text-white justify-content-md-center my-sm-5">
            <Button className='btn btn-dark border-rounded' onClick={()=>{ navigate('/taskerprofile')}}>
      Back
      </Button>
                <h2 className="mb-4">New Requests</h2>
                {tasks.map(task => (
                    <Col key={task._id}>
                        <div className="card p-4 mb-4" style={{ maxWidth: '400px' }}>
                            <h2 className="mb-4">Incoming Request</h2>
                            <p>Name: {task.taskname}</p>
                            <p>Date: {task.taskdate}</p>
                            <p>Slot: {task.taskslot}</p>
                            <p>Address: {task.useraddress}</p>
                            <p>Name: {task.username}</p>
                            <p>Phone: {task.userphone}</p>
                            <p>Price: {task.taskprice}</p>
                            <div className="d-flex justify-content-center mt-4">
                                <button className="btn btn-success me-2" onClick={() => handleAccept(task._id)}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleCancel(task._id)}>Cancel</button>
                            </div>
                        </div>
                    </Col>
                ))}
            </div>
        </>
    );
};

export default IncomingRequest;

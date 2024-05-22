import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TaskerIncompReasonForm = () => {
  const [reason, setReason] = useState('');
  const location = useLocation();
  const incomptask = location.state;
  const Navigate = useNavigate();

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      reason,
      incompId: incomptask._id,
    };

    try {
      const response = await fetch('http://localhost:4000/taskerIncompletedreason', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        Navigate("/taskerincompleted");
      } else {
        console.error('Failed to submit review:', response.status);
        // Handle the error condition accordingly
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
      // Handle the error condition accordingly
    }

    // Reset the form fields after submission
    setReason('');
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}>
      <h2>Write a Reason:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            className="form-control"
            id="reason"
            rows="3"
            value={reason}
            onChange={handleReasonChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default TaskerIncompReasonForm;

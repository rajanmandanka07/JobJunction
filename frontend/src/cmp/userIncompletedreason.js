import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserIncompReasonForm = () => {
  const [reason, setReason] = useState('');
  const location = useLocation();
  const incomptask = location.state;
  const Navigate = useNavigate();

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const formData = {
      reason,
      incompId: incomptask._id,
    };

    try {
      const response = await fetch('http://localhost:4000/userIncompletedreason', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        Navigate("/userprofile");
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
    <div className="container mt-5">
      <h2 className="mb-4">Write a Reason:</h2>
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
            style={{ borderRadius: '0.25rem', padding: '0.5rem', border: '1px solid #ced4da' }}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserIncompReasonForm;

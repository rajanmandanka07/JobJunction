import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserReviewForm = () => {
  const [review, setReview] = useState('');
  const [ratings, setRating] = useState(0);
  const location = useLocation();
  const comptask = location.state;
  const Navigate = useNavigate();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const formData = {
      taskdate: comptask.taskdate,
      taskslot: comptask.taskslot,
      taskername: comptask.taskername,
      taskerphone: comptask.taskerphone,
      taskprice: comptask.taskprice,
      taskname: comptask.taskname,
      userId: comptask.userId,
      taskerId: comptask.taskerId,
      review,
      ratings,
      confirmId: comptask._id,
    };

    try {
      const response = await fetch('http://localhost:4000/userreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        Navigate("/usercompleted")
      } else {
        console.error('Failed to submit review:', response.status);
        // Handle the error condition accordingly
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
      // Handle the error condition accordingly
    }

    // Reset the form fields after submission
    setReview('');
    setRating(0);
  };

  return (
    <div className="container-fluid bg-light" style={{ width: '100%', height: '100vh', padding: '5rem' }}>
      <h2 className="text-center">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea
            className="form-control"
            id="review"
            rows="3"
            value={review}
            onChange={handleReviewChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (out of 10):</label>
          <input
            type="number"
            className="form-control my-2"
            id="rating"
            min="0"
            max="10"
            value={ratings}
            onChange={handleRatingChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserReviewForm;

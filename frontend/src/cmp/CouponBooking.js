import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useLocation,useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'


function CouponBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    area: '',
    slot: '',
    date: '',
    address: ''
  });
  const location = useLocation();
  const { 
    taskprice,
    taskname,
    username,
    userphone,
    userId,
    taskerId,
     } = location.state;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {
      address: formData.address,
      area: formData.area,
      task: taskname,
      slot: formData.slot,
      date: formData.date,
      price: taskprice,
      userId: userId,
      username:username,
      userphone : userphone,
      usercoupon:"YES",
      taskerId
    };

    try {
      const response = await fetch('http://localhost:4000/couponavailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data); 
        navigate('/Confirmation',{state: { responseData: data }})
      } else if(response.status === 405) {
        alert(data.message);
      }
      else if(response.status === 404) {
        alert(data.message);
      }
      else{
        alert("server error please try later!!");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 4);

  const formattedToday = today.toISOString().split('T')[0];
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  return (
    <div className="container-fluid bg-dark text-black" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="font-weight-bold text-white">Booking</h1>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">Area</label>
            <select className="form-control form-select" id="area" name="area" placeholder="Area" onChange={handleChange} value={formData.area} >
            <option value="">Select One</option>
                  <option value="Shyamnagar">Shyamnagar </option>
                  <option value="Railnagar">Railnagar </option>
                  <option value="Bhagvatipara">Bhagvatipara</option>
                  <option value="Morbi Road">Morbi Road </option>
                  <option value="IMA">IMA </option>
                  <option value="Kabirvan">Kabirvan </option>
                  <option value="Ram Park">Ram Park </option>
                  <option value="Redcross Sadar">Redcross Sadar </option>
                  <option value="Redcross Ramnathpara">Redcross Ramnathpara</option>
                  <option value="Nana Mauva">Nana Mauva</option>
                  <option value="Aambedkarnagar">Aambedkarnagar </option>
                  <option value="Vijayplot">Vijayplot </option>
                  <option value="Nandanvan">Nandanvan </option>
                  <option value="Mavdi">Mavdi </option>
                  <option value="Narayannagar">Narayannagar </option>
                  <option value="AHMP">AHMP </option>
                  <option value="Champaknagar">Champaknagar </option>
                  <option value="Hudko">Hudko </option>
                  <option value="Pranami Chowk">Pranami Chowk </option>
                  <option value="New Raghuvir">New Raghuvir </option>
                  <option value="Kothariya">Kothariya </option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="slot" className="form-label">Slot</label>
          <select className="form-select" name="slot" onChange={handleChange} value={formData.slot}>
                  <option value=''>Select One</option>
                  <option value="Morning (9 - 12 AM)">Morning (9 - 12 AM) </option>
                  <option value="Afternoon (2 - 5 PM)">Afternoon (2 - 5 PM) </option>
                  <option value="Evening (5 - 8 PM)">Evening (5 - 8 PM)</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" name="date" onChange={handleChange} value={formData.date} required min={formattedToday} max={formattedMaxDate} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea type="text" className="form-control" name="address" placeholder="Address" onChange={handleChange} value={formData.address} rows="3" required />
        </div>
        <button type="submit" className="btn btn-primary mx-1">Confirm</button>
        <Link  to='/Userhome' className="btn btn-secondary">Back</Link>
      </form>
    </div>
  );
}

export default CouponBooking;

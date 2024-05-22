import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
const Entry = () => {
  const navigate = useNavigate();
  const [popupContent, setPopupContent] = useState(''); // Define popupContent state
  const [showPopup, setShowPopup] = useState(false); 
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    area:''
  });

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSignup) {
      if (formData.name.trim() === '') {
        alert('Please enter your name.');
        return;
      }
      if (formData.phone.trim() === '') {
        alert('Please enter your phone number.');
        return;
      }
      if (formData.area.trim() === '') {
        alert('Please select an area.');
        return;
      }
    }
    if (formData.email.trim() === '') {
      alert('Please enter your email.');
      return;
    }
    if (formData.password.trim() === '') {
      alert('Please enter a password.');
      return;
    }
    try {
      const response = await fetch(isSignup ? 'http://localhost:4000/signup' : 'http://localhost:4000/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(response.status===201)
      {
        setPopupContent("Singup successful! ");
        setShowPopup(true);
        setIsSignup(false);
        navigate('/Entry');
       
      }
      else if(response.status===400)
      {
        setPopupContent("User Already Exist \n Use Different Email ");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/Entry');
      }
      else if(response.status===500){
        setPopupContent("Server Error");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/Entry');
      }
      else if(response.status===401){
        setPopupContent("Invalid Credencials");
        setShowPopup(true);
        navigate('/Entry');
      }
      else if(response.status===200){
        cookies.set('token', data, { path: '/' });
        navigate('/Userhome');
      }
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className='bg-dark text-white'>
    <Navbar bg="secondary" expand="lg" className="mb-4 text-white">
        <Container fluid>
          <Navbar.Brand className='text-white'><Link to='/' className='text-decoration-none text-white'>
            <img
              alt=''
              src="../logo.jpeg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            JobJunction
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    <div className="container-fluid bg-dark text-black" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={toggleForm} className='btn btn-outline-light mb-3'>{isSignup ? 'Switch to Login' : 'Switch to Signup'}</button>
      {isSignup ? (
        <>
          <h1 className="font-weight-bold text-white">Sign Up</h1>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-Mail</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="E-Mail" onChange={handleChange} value={formData.email} />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="Pno" className="form-label">Phone No.</label>
                <input type="text" className="form-control" id="Pno" name="phone" placeholder="Phone No." onChange={handleChange} value={formData.phone} />
              </div>
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
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to='/' className='text-decoration-none mt-3 mx-3'>
              <button type="button" className="btn btn-secondary">Back</button>
            </Link>
          </form>
        </>
      ) : (
        <>
          <h1 className="font-weight-bold text-white">Login</h1>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to='/' className='text-decoration-none mt-3 mx-3'>
              <button type="button" className="btn btn-secondary">Back</button>
            </Link>
          </form>
        </>
      )}
      {showPopup && (
  <div className="popup-overlay position-fixed  top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
    <div className="popup bg-secondary text-white rounded p-4">
      <div className="popup-content">
        <p>{popupContent}</p>
        <button className="btn btn-danger" onClick={() => setShowPopup(false)}>Close</button>
      </div>
    </div>
  </div>
)}


    </div>
    </div>
    </>
    
  );
};

export default Entry;

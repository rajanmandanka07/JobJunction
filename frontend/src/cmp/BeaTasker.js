import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const BeaTasker = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [popupContent,setPopupContent] = useState('');
  const [showPopup,setShowPopup] = useState(false);
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    area:'',
    task:''
  })
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) =>{
    setFormData ({...formData,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async (e)=>{
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
      if (formData.task.trim() === '') {
        alert('Please select a task.');
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
    try{
        const response = await fetch(isSignup? 'http://localhost:4000/taskersignup':'http://localhost:4000/taskerlogin',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await response.json();
        if(response.status===201)
      {
        setPopupContent("Singup successful! ");
        setShowPopup(true);
        setIsSignup(false);
        navigate('/BeaTasker');
       
      }
      else if(response.status===400)
      {
        setPopupContent("Tasker Already Exist \n Use Different Email ");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/BeaTasker');
      }
      else if(response.status===500){
        setPopupContent("Server Error");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/BeaTasker');
      }
      else if(response.status===401){
        setPopupContent("Invalid Credencials");
        setShowPopup(true);
        setIsSignup(false);
        navigate('/BeaTasker');
      }
      else if(response.status===200){
        cookies.set('taskertoken', data, { path: '/' });
        navigate('/taskerprofile');
      }
      console.log(data);
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div className="container-fluid bg-dark text-black" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={toggleForm} className='btn btn-outline-light mb-3'>{isSignup ? 'Switch to Login' : 'Switch to Signup'}</button>
      {isSignup ? (
        <>
          <h1 className="font-weight-bold text-white">Sign Up</h1>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName" name='name' placeholder="Full Name" onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input type="email" className="form-control" id="email" placeholder="E-Mail" name='email' onChange={handleChange}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={handleChange}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="Pno" className="form-label">Phone No.</label>
                <input type="text" className="form-control" id="Pno" placeholder="Phone No."  name='phone'onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="area" className="form-label">Area</label>
                <select  className="form-control form-select" id="area" placeholder="Area" name='area' onChange={handleChange} value={formData.area}>
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
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="task" className="form-label">Select Task</label>
                <select  className="form-control form-select" id="task" placeholder="Task" name='task' onChange={handleChange} value={formData.task}>
                <option value="">Select One</option>
          {/* Assembly */}
          <option value="General Furniture Assembly">General Furniture Assembly</option>
          <option value="Bookshelf Assembly">Bookshelf Assembly</option>
          <option value="Desk Assembly">Desk Assembly</option>
          <option value="Crib Assembly">Crib Assembly</option>
          <option value="PAX Assembly">PAX Assembly</option>
          
          {/* Mounting */}
          <option value="General Mounting">General Mounting</option>
          <option value="TV Mounting">TV Mounting</option>
          <option value="Mount Shelves">Mount Shelves</option>
          <option value="Install Curtains & Blinds">Install Curtains & Blinds</option>
          <option value="Hang Art">Hang Art</option>
          <option value="Mount Home Decor">Mount Home Decor</option>
          
          {/* Moving */}
          <option value="Help Moving">Help Moving</option>
          <option value="Trash & Furniture Removal">Trash & Furniture Removal</option>
          <option value="Heavy Lifting & Loading">Heavy Lifting & Loading</option>
          <option value="Rearrange Furniture">Rearrange Furniture</option>
          <option value="Junk Haul Away">Junk Haul Away</option>
          <option value="Apartment Moving">Apartment Moving</option>
          
          {/* Cleaning */}
          <option value="Party Clean Up">Party Clean Up</option>
          <option value="Apartment Cleaning">Apartment Cleaning</option>
          <option value="Deep Clean">Deep Clean</option>
          <option value="Garage Cleaning">Garage Cleaning</option>
          <option value="Move Out Clean">Move Out Clean</option>
          <option value="Office Cleaning">Office Cleaning</option>
          
          {/* OutdoorHelp */}
          <option value="Yard Work">Yard Work</option>
          <option value="Lawn Care">Lawn Care</option>
          <option value="Snow Removal">Snow Removal</option>
          <option value="Landscaping Help">Landscaping Help</option>
          <option value="Branch & Hedge Trimming">Branch & Hedge Trimming</option>
          <option value="Gardening & Weeding">Gardening & Weeding</option>
          
          {/* HomeRepairs */}
          <option value="Door, Cabinet, & Furniture Repair">Door, Cabinet, & Furniture Repair</option>
          <option value="Wall Repair">Wall Repair</option>
          <option value="Sealing & Caulking">Sealing & Caulking</option>
          <option value="Appliance Installation & Repairs">Appliance Installation & Repairs</option>
          <option value="Window & Blinds Repair">Window & Blinds Repair</option>
          <option value="Flooring & Tiling Help">Flooring & Tiling Help</option>
          <option value="Electrical Help">Electrical Help</option>
          <option value="Plumbing Help">Plumbing Help</option>
          <option value="Light Carpentry">Light Carpentry</option>
          
          {/* Painting */}
          <option value="Indoor Painting">Indoor Painting</option>
          <option value="Wallpapering">Wallpapering</option>
          <option value="Outdoor Painting">Outdoor Painting</option>
          <option value="Concrete & Brick Painting">Concrete & Brick Painting</option>
          <option value="Accent Wall Painting">Accent Wall Painting</option>
          <option value="Wallpaper Removal">Wallpaper Removal</option>
        </select>
                
              </div>
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
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
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
  );
};

export default BeaTasker;

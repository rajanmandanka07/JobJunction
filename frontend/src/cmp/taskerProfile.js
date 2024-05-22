import React, { useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img1 from '../images/img1.jpeg'
import logo from '../logo.jpeg';
import { useNavigate } from 'react-router-dom';
const TaskerProfile = () => {
  const [cookies] = useCookies(['taskertoken']);
  const [taskername, setTaskerName] = useState('');
  const [taskerphone, setTaskerPhone] = useState('');
  const [taskeremail, setTaskerEmail] = useState('');
  const [taskerarea, setTaskerArea] = useState('');
  const [taskertask, setTaskerTask] = useState('');
  const [taskerpassword, setTaskerPassword] = useState('');
  const taskerId = cookies.taskertoken.taskerId;
  const [isEditing, setIsEditing] = useState(false);
  const Navigate = useNavigate()
  const deleteYesterdayEntries = async () => {
    try {
      await fetch('http://localhost:4000/deleteYesterdayEntries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentDate: new Date() })
      });
    } catch (error) {
      console.error('Error deleting yesterday entries:', error);
    }
  };
  useEffect(() => {
    if (cookies.taskertoken) {
      const taskerData = cookies.taskertoken;
      setTaskerName(taskerData.name);
      setTaskerPhone(taskerData.phone);
      setTaskerEmail(taskerData.email);
      setTaskerArea(taskerData.area);
      setTaskerPassword(taskerData.password);
      setTaskerTask(taskerData.task)
      
      // Set profileData after updating state variables
      setProfileData({
        name: taskerData.name,
        email: taskerData.email,
        area: taskerData.area,
        phone: taskerData.phone,
        password: taskerData.password,
        task:taskerData.task
      });
    }
   
    deleteYesterdayEntries();
  
  }, [cookies.taskertoken]);

  const [profileData, setProfileData] = useState({
    name: taskername,
    email: taskeremail,
    area: taskerarea,
    phone: taskerphone,
    password: taskerpassword, 
    task: taskertask
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if(isEditing){
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/updatetasker',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchData();
    }
    
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset form fields to original values
    setIsEditing(false);
  };

  return (
    <>
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/taskerprofile" className='text-decoration-none text-white'>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            JobJunction
            </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Link to='/' className='text-decoration-none'>
            <button type="submit" className="btn btn-danger btn-lg">LogOut</button></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="container-fluid bg-dark text-black" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div  className="user-profile-form bg-dark text-light rounded text-center col-7 ">
     
     <div className="row mb-3">
     <div className="col-md-8 p-3">
      <Form >
          <h2>Tasker Profile</h2>
     
        <Form.Group controlId="formName">
          <Form.Label  className="mb-0">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled
            />
        </Form.Group>

        <Form.Group controlId="formArea">
            <Form.Label>Area</Form.Label>
            <select className="form-control form-select" id="area" placeholder={taskerarea} name='area' onChange={handleInputChange} value={profileData.area} disabled={!isEditing}>
            <option value={taskerarea}>Select One</option>
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
          </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            />
        </Form.Group>

        <Form.Group controlId="formTask">
            <Form.Label>Task</Form.Label>
            <select className="form-control form-select" id="task" placeholder={taskertask} name='area' onChange={handleInputChange} value={profileData.area} disabled={!isEditing}>
            <option value={taskertask}>Select One</option>
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
          </Form.Group>


        {isEditing ? (
            <>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveClick} className="m-3 ">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCancelClick} className="m-3 ">
              Cancel
            </Button>
          </>
        ) : (
            <Button variant="info" onClick={handleEditClick} className="m-3 ">
            Edit Profile
          </Button>
        )}
      </Form>
        </div>   
        <div className="col-md-4 p-3">
         <h2 >Pay Here</h2>
      <img className="m-3  img-fluid img-thumbnail " //className='d-flex justify-content-end'
          src={img1} // Replace with actual image URL
          alt="Profile" 
          style={{ height: '200px' }}
          />
    </div> 
      </div>
     
    </div>
    <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/incomingrequest',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">Check Incoming Booking Requests</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskerpending',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">See Pending Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskercompleted',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">See Completed Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskerincompleted',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">Check InCompleted Work</h1>
      </Button>   
    </div>
    </>
  );
};

export default TaskerProfile;

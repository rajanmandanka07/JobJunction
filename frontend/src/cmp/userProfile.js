import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const Navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const [username, setUserName] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userarea, setUserArea] = useState('');
  const [userpassword, setUserPassword] = useState('');
  const userId = cookies.token.userId;
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
    if (cookies.token) {
      const userData = cookies.token;
      setUserName(userData.name);
      setUserPhone(userData.phone);
      setUserEmail(userData.email);
      setUserArea(userData.area);
      setUserPassword(userData.password);
      
      // Set profileData after updating state variables
      setProfileData({
        name: userData.name,
        email: userData.email,
        area: userData.area,
        phone: userData.phone,
        password: userData.password
      });
    }
    
    deleteYesterdayEntries();
  }, [cookies.token]);

  const [profileData, setProfileData] = useState({
    name: username,
    email: useremail,
    area: userarea,
    phone: userphone,
    password: userpassword, 
  });

  


  const [isEditing, setIsEditing] = useState(false);

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
          const response = await fetch('http://localhost:4000/updateuser',{
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
    setIsEditing(false);
  };

  return (
    <div className="container-fluid bg-dark text-black" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="user-profile-form bg-dark text-light rounded text-center col-7">
        <Form>
          <h2>User Profile</h2>
          <Form.Group controlId="formName">
            <Form.Label className="mb-0">Name</Form.Label>
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
            <select className="form-control form-select" id="area" placeholder={userarea} name='area' onChange={handleInputChange} value={profileData.area} disabled={!isEditing}>
            <option value={userarea}>Select One</option>
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
            <Form.Label>Phone </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>

          {isEditing ? (
            <>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
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
      <Link to='/Userhome' className="btn btn-secondary">Back</Link>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/discountcoupon',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Discount Coupons</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/userpending',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Pending Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/usercompleted',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Completed Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/userincompleted',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Incompleted Work</h1>
      </Button>
    </div>
  );
};

export default UserProfile;

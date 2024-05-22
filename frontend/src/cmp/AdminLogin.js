import { Link,useNavigate } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { useState } from 'react';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [popupContent, setPopupContent] = useState('');
  const [showPopup, setShowPopup] = useState(false); 
    const[Login,setLogin] = useState({
      email:'',
      password:''
    })
    const handleChange = (e)=>{
        setLogin({...Login,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
          const response = await fetch('http://localhost:4000/adminlogin',{
                method:'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body : JSON.stringify(Login)
          });
          if(response.status === 200){
            navigate('/Admin');
          }else if(response.status === 401){
            setPopupContent("Invalid Credentials!!!");
            setShowPopup(true);
            navigate('/AdminLogin');
          }else if(response.status === 500){
            setPopupContent("Server Error");
            setShowPopup(true);
            navigate('/AdminLogin');
          }
        }catch(err)
        {
          console.error(err);
        }
         
        
    }
  return (
    <>
      <div className='bg-dark text-white'>
        <Navbar bg="secondary" expand="lg" className="mb-4 text-whie">
          <Container fluid> 
            <Navbar.Brand href="#home">
              <img
                alt=''
                src="../logo.jpeg" 
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              <span className='text-white'>JobJunction</span>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container-fluid bg-dark tex-black" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="font-weight-bold text-white">Login</h1>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" onChange={handleChange} className="form-control" name="email" placeholder="email"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" onChange={handleChange} className="form-control" name="password" placeholder="Password"/>
            </div>
           
              <button type="submit" className="btn btn-primary">Login</button>
           
            <Link to='/' className='text-decoration-none mt-3 mx-3'>
              <button type="button" className="btn btn-secondary">Back</button>
            </Link>
          </form>
        </div>
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
    </>
  );
};

export default AdminLogin;

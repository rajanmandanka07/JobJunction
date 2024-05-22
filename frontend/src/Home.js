import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import logo from './logo.jpeg';
// import img1 from './images/assembly.webp'
// import img2 from './images/cleaning.jpg'
// import img3 from './images/homerepairs.jpg'
// import img4 from './images/moutning.jpeg'
// import img5 from './images/moving.webp'
// import img6 from './images/outdoor.jpg'
// import img7 from './images/painting.jpg'
// import img8 from './images/trending.jpeg'
import project1 from './images/project1.jpeg'
import project2 from './images/project2.jpg'
import project3 from './images/project3.jpg'
import project4 from './images/project4.jpg'
import project5 from './images/project5.jpg'
import project6 from './images/project6.webp'
import project7 from './images/project7.jpg'
import project8 from './images/project8.jpeg'
import {Link } from 'react-router-dom';
function Userhome() {
  const [key, setKey] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks');
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (category) => {
    setKey(category);
    setFilteredTasks(tasks.filter(task => task.category === category));
  };

  
  return (
    <>
    <div className="bg-dark text-white">
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/" className='text-decoration-none text-white'>
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
          ><Link to='/Entry' style={{textDecoration:'none'}}>
            <Button variant="btn btn-info btn-lg" className="ms-2">SignUp/Login</Button></Link>
            <Link to='/BeaTasker' style={{textDecoration:'none'}}><Button variant="btn btn-primary btn-lg" className="ms-2">Be a Tasker</Button> </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Link to="/Entry" className='tet-decoration-none'><Button variant="btn btn-info btn-lg">Search</Button></Link>
            <Link to="/AdminLogin" className='tet-decoration-none'>
             </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="container-fluid bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-3 mb-4" style={{ textDecoration: 'underline', textAlign: 'center', }}>Services</h1>
          </div>
        </div>
        <div className="container-fluid bg-dark">
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
          <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => handleTabChange(k)} className="my-3 justify-content-center bg-primary-hover">
      {/* Render tabs dynamically */}
      {/* Assume you have unique categories */}
      {Array.from(new Set(tasks.map(task => task.category))).map(category => (
        <Tab key={category} eventKey={category} title={category}>
          <div className="table-responsive">
            <table className="table table-dark justify-content-center ">
              <tbody className='justify-content-center '>
                {filteredTasks.map(task => (
                  task.category === category &&
                  <tr key={task._id}>
                    <td>
                      <Link to="/Entry" className='text-decoration-none'>
                        <Button className='btn btn-dark'>{task.task} - RS {task.price}</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
      ))}
    </Tabs>
            <div className="row m-5">
          <div className="col-12">
            <h1 className="display-3 my-4" style={{ textDecoration: 'underline', textAlign: 'center', }}>Popular Projects</h1>
          </div>
        </div>
        <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Card 1 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project1} className="card-img-top" alt="Card 1" />
            <div className="card-body">
              <h5 className="card-title">Furniture Assembly</h5>
              <p className="card-text">Prices starting at RS. 250</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Repeat the above code for remaining cards */}
        {/* Card 2 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project2} className="card-img-top" alt="Card 2" />
            <div className="card-body">
              <h5 className="card-title">Mount Art or Shelves</h5>
              <p className="card-text">Prices starting at RS. 700</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project3} className="card-img-top" alt="Card 3" />
            <div className="card-body">
              <h5 className="card-title">Mount a TV</h5>
              <p className="card-text">Prices starting at RS. 200</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project4} className="card-img-top" alt="Card 4" />
            <div className="card-body">
              <h5 className="card-title">Help Moving</h5>
              <p className="card-text">Prices starting at RS. 500</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 5 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project5} className="card-img-top" alt="Card 5" />
            <div className="card-body">
              <h5 className="card-title">Home and Apartment Cleaning</h5>
              <p className="card-text">Prices starting at RS. 500</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 6 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project6} className="card-img-top" alt="Card 6" />
            <div className="card-body">
              <h5 className="card-title">Minor Plumbing Repair</h5>
              <p className="card-text">Prices starting at RS. 400</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 7 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project7} className="card-img-top" alt="Card 7" />
            <div className="card-body">
              <h5 className="card-title">Electric Help</h5>
              <p className="card-text">Prices starting at RS. 500</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
        {/* Card 8 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project8} className="card-img-top" alt="Card 8" />
            <div className="card-body">
              <h5 className="card-title">Heavy Lifting</h5>
              <p className="card-text">Prices starting at RS. 700</p>
              <Link to="/Entry" className="btn btn-primary">Book Now !!</Link>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="row">
          <div className="col-12">
            <h1 className="display-5 my-4 text-info" style={{ textAlign: 'center', }}>See what happy customers are saying about <span className='text-white'>JobJunction</span></h1>
          </div>
        </div>
        <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {/* First Row */}
        <div className="col mb-4">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Elizabeth A.</h5>
              <p className="card-text">Vitalii assembled the Norli drawer chest for me in less than 30 minutes, and he assembled a metal wire shelving unit as well in about 10
minutes.Great Work!!</p>
              <div className="btn btn-primary">4.9/5</div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Sabrina J.</h5>
              <p className="card-text">Michael did a great job helping us
install frameless glass hinged shower
doors with an unusual set up. He was
patient and willing to help figure it out
with us. Thank you Michael!</p>
              <div className="btn btn-primary">4.4/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Jana R.</h5>
              <p className="card-text">I hired Joe to patch 2 holes on my
wall and 1 hole on my ceiling. Joe was
great with communication, was fast,
professional and did a fantastic job.</p>
              <div className="btn btn-primary">4.5/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Tiffany A.</h5>
              <p className="card-text">David did an awesome job
              assembling crib and dresser for
              nursery.</p>
              <div className="btn btn-primary">4.2/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">L.Amanda</h5>
              <p className="card-text">Aleksandr was fantastic! He came
              with all the equipment to do the job,
              even the hardware I didn't know I
              would need. He hung a heavy
              chandelier perfectly and fixed a
              cabinet to our wall.</p>
              <div className="btn btn-primary">4.7/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Elisa P.</h5>
              <p className="card-text">Jose fixed my AC drain line which
                                was clogging my master bathroom
                                sink. He was prompt, communicative,
                                and efficient. Highly recommend!</p>
              <div className="btn btn-primary">4.5/5</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-body-tertiary text-center text-lg-start">
  <div className="text-center p-3 bg-dark">
    © 2024 Copyright:
    <a className="text-body" href="/"><span className='text-white'> JobJunction.com</span></a>
  </div>
</footer>
    </div>
    </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Userhome;

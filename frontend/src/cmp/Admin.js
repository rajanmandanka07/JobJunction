import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.jpeg';

function Admin() {
  const initialTasks = [
    { id: 1, name: 'Task 1', category: 'Category 1', subcategory: 'Sub Category 1', price: 10 },
    { id: 2, name: 'Task 2', category: 'Category 2', subcategory: 'Sub Category 2', price: 20 },
    { id: 3, name: 'Task 3', category: 'Category 3', subcategory: 'Sub Category 3', price: 30 }
  ];

  const initialUsers = [
    { id: 1, name: 'Tasker 1' },
    { id: 2, name: 'Tasker 2' },
    { id: 3, name: 'Tasker 3' }
  ];

  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const subcategoriesMap = {
    'Category 1': ['Sub Category 1', 'Sub Category 2', 'Sub Category 3'],
    'Category 2': ['Sub Category 4', 'Sub Category 5', 'Sub Category 6'],
    'Category 3': ['Sub Category 7', 'Sub Category 8', 'Sub Category 9'],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [users, setUsers] = useState(initialUsers);
  const [showTasks, setShowTasks] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskCategory, setEditTaskCategory] = useState('');
  const [editTaskSubcategory, setEditTaskSubcategory] = useState('');
  const [editTaskPrice, setEditTaskPrice] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskSubcategory, setNewTaskSubcategory] = useState('');
  const [newTaskPrice, setNewTaskPrice] = useState('');
  const [newTaskerName, setNewTaskerName] = useState('');

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditTaskId(taskId);
      setEditTaskName(taskToEdit.name);
      setEditTaskCategory(taskToEdit.category);
      setEditTaskSubcategory(taskToEdit.subcategory);
      setEditTaskPrice(taskToEdit.price);
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditUserName(userToEdit.name);
    }
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map(task => {
      if (task.id === editTaskId) {
        return {
          ...task,
          name: editTaskName,
          category: editTaskCategory,
          subcategory: editTaskSubcategory,
          price: editTaskPrice
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskName('');
    setEditTaskCategory('');
    setEditTaskSubcategory('');
    setEditTaskPrice('');
  };

  const handleSaveEditUser = () => {
    const updatedUsers = users.map(user => {
      if (user.id === editUserId) {
        return {
          ...user,
          name: editUserName
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditUserName('');
  };

  const handleAddTask = () => {
    if (!newTaskName || !newTaskCategory || !newTaskSubcategory || !newTaskPrice) {
      alert('Please fill out all fields');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      category: newTaskCategory,
      subcategory: newTaskSubcategory,
      price: newTaskPrice
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setNewTaskCategory('');
    setNewTaskSubcategory('');
    setNewTaskPrice('');
  };

  const handleAddTasker = () => {
    if (!newTaskerName) {
      alert('Please enter a Tasker name');
      return;
    }

    const newTasker = {
      id: users.length + 1,
      name: newTaskerName
    };
    setUsers([...users, newTasker]);
    setNewTaskerName('');
  };


  return (
    <div className='bg-dark text-white' style={{ backgroundColor: 'black', minHeight: '100vh' }}>
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
            >
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="btn btn-info btn-lg">Search</Button>
              <Link to='/' className='text-decoration-none'>
                <button type="submit" className="btn btn-danger btn-lg">LogOut</button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container bg-dark text-white">
        <div className='py-3'>
          <div className="row">
            <div className="col-6 mx-auto">
              <button
                className={`btn ${showTasks ? 'btn-primary' : 'btn-outline-primary'} col-12 mx-auto`}
                type="button"
                onClick={() => setShowTasks(true)}
              >
                Tasks
              </button>
            </div>
            <div className="col-6 mx-auto">
              <button
                className={`btn ${showTasks ? 'btn-outline-primary' : 'btn-primary'} col-12 mx-auto`}
                type="button"
                onClick={() => setShowTasks(false)}
              >
                Tasker
              </button>
            </div>
          </div>
        </div>
        {showTasks && (
          <div className="row my-3">
            <div className="col-10 mx-auto">
              <h4>Add Task</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Task Name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
              />
              <select
                className="form-control mb-2"
                value={newTaskCategory}
                onChange={(e) => {
                  setNewTaskCategory(e.target.value);
                  setNewTaskSubcategory('');
                }}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {newTaskCategory && (
                <select
                  className="form-control mb-2"
                  value
                  ={newTaskSubcategory}
                  onChange={(e) => setNewTaskSubcategory(e.target.value)}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategoriesMap[newTaskCategory].map(subcategory => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              )}
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                value={newTaskPrice}
                onChange={(e) => setNewTaskPrice(e.target.value)}
                required
              />
              <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        )}
        {!showTasks && (
          <div className="row my-3">
            <div className="col-10 mx-auto">
              <h4>Add Tasker</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tasker Name"
                value={newTaskerName}
                onChange={(e) => setNewTaskerName(e.target.value)}
                required
              />
              <button className="btn btn-primary" onClick={handleAddTasker}>Add Tasker</button>
            </div>
          </div>
        )}
        <div className="row my-3">
          <div className="col-10 mx-auto">
            <h4>{showTasks ? 'Tasks' : 'Tasker'}</h4>
            <ul className="list-group my-3">
              {showTasks
                ? tasks.map(task => (
                  <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center my-2">
                    {editTaskId === task.id ? (
                      <div>
                        <input
                          type="text"
                          value={editTaskName}
                          onChange={(e) => setEditTaskName(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Task Name"
                        />
                        <select
                          className="form-control mb-2"
                          value={editTaskCategory}
                          onChange={(e) => {
                            setEditTaskCategory(e.target.value);
                            setEditTaskSubcategory('');
                          }}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {editTaskCategory && (
                          <select
                            className="form-control mb-2"
                            value={editTaskSubcategory}
                            onChange={(e) => setEditTaskSubcategory(e.target.value)}
                            required
                          >
                            <option value="">Select Subcategory</option>
                            {subcategoriesMap[editTaskCategory].map(subcategory => (
                              <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                          </select>
                        )}
                        <input
                          type="number"
                          value={editTaskPrice}
                          onChange={(e) => setEditTaskPrice(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Price"
                        />
                      </div>

                    ) : (
                      <div>
                        <h5>{task.name}</h5>
                        <p>Category: {task.category}</p>
                        <p>Sub Category: {task.subcategory}</p>
                        <p>Price: ₹​{task.price}</p>
                      </div>
                    )}

                    <div>
                      {editTaskId === task.id ? (
                        <button className="btn btn-sm btn-success m-1" onClick={handleSaveEditTask}>Save</button>
                      ) : (
                        <button className="btn btn-sm btn-secondary m-1" onClick={() => handleEditTask(task.id)}>Edit</button>
                      )}
                      <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </div>
                  </li>
                ))
                : users.map(user => (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center my-2">
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                        className="form-control"
                        style={{width: '80%'}}
                      />
                    ) : (
                      user.name
                    )}
                    <div>
                      {editUserId === user.id ? (
                        <button className="btn btn-sm btn-success m-1" onClick={handleSaveEditUser}>Save</button>
                      ) : (
                        <button className="btn btn-sm btn-secondary mx-1" onClick={() => handleEditUser(user.id)}>Edit</button>
                      )}
                      <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
  </div >
  );
}

export default Admin;

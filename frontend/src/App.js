import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <div className="App list-group-item
    justify-content-center align-items-center 
    mx-auto" style={{ "width": "400px", "backgroundColor": "white", "marginTop": "15px" }}>
      <h1 className='card text-white bg-primary mb-1'
      styleName='max-width: 20rem:'>Base Project Name</h1>
      <h6 className='card text-white bg-primary mb-3'>FastAPI - React - MariaDB</h6>
      <div className='card-body'>
      <h5 className='card text-white bg-dark mb-3'>Login</h5>
        <span className='card-text'>
          <input className='mb-2 form-control titleIn' placeholder='username'/>
          <input className='mb-2 form-control desIn' placeholder='password'/>
          <button className='btn btn-outline-primary mx-2 mb-2' style={
            {"borderRadius": "50px", "font-weight": "bold"}
          }>Create</button>
          </span>
        <h5 className='card text-white bg-dark mb-3'>Create new user</h5>
        <span className='card-text'>
          <input className='mb-2 form-control titleIn' placeholder='username'/>
          <input className='mb-2 form-control desIn' placeholder='password'/>
          <input className='mb-2 form-control titleIn' placeholder='first name'/>
          <input className='mb-2 form-control desIn' placeholder='last name'/>
          <input className='mb-2 form-control desIn' placeholder='email'/>
          <button className='btn btn-outline-primary mx-2 mb-5' style={
            {"borderRadius": "50px", "font-weight": "bold"}
          }>Create</button>
          </span>

      </div>
      <h6 className='card text-dark bg-warning py-1 mb-0'>Copyright 2024, All rights reserved &copy;</h6>
      </div>

  )}

  export default App;

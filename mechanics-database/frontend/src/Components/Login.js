import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';

async function loginEmployee(credentials) {
 return fetch('http://localhost:8080/Login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

async function loginUser(credentials) {
 return fetch('http://localhost:8081/Login/customer/'+credentials.username, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

async function checkEmployee(credentials){
  return fetch('http://127.0.0.1:5000/online/harperdb/employee/' + credentials.username, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
};

async function checkUser(credentials){
  return fetch('http://127.0.0.1:5000/online/harperdb/customer/' + credentials.username, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
};

function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleEmployeeSubmit = async e => {
      e.preventDefault();
      const test = await checkEmployee({username,password});
      console.log(test);
      if (password == test[0].employee_password){
        const token = await loginEmployee(
        {username,
        password}
      );
        setToken(token);
      }
    };

  const handleCustomerSubmit = async e => {
      e.preventDefault();
      const test = await checkUser({username,password});
      console.log(test);
      if (password == test[0].customer_password){
        const token = await loginUser(
        {username,
        password}
      );
        setToken(token);
      }
    };


  return(

      <div class="row align-items-center bigrow">

        <div class="col-lg-6">
          <h1>Log in As Employee</h1>
          <form onSubmit={handleEmployeeSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        <div class="col-lg-6">
          <h1>Log in As Customer</h1>
          <form onSubmit={handleCustomerSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

      </div>

  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login;

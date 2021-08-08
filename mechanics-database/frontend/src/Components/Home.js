import React from "react";
import Car from "./Car1.png";
import Workers from "./Employees.png";
import cParts from "./Parts.png";
import Repair from "./Repairs.png";
import Customer from "./Customer.png";
import './App.css';
//creates the home UI seen by the employee after login
function Home() {
  return (
    <div className="home">
      <div class="container">

        <div class="row align-items-center  my-5">
        <div class="col-lg-4">
            <h1 class="font-weight-light text-white">Employees</h1>
          </div>
          <div class="col-lg-4">
            <h1 class="font-weight-light text-white">Vehicles</h1>
          </div>
          <div class="col-lg-4">
            <h1 class="font-weight-light text-white">Parts</h1>
          </div>
        </div>

        <div class="row align-items-center  my-5">

          <div class="col-lg-4">
            <a href='/Employees'>
              <img src={Workers} width="100%" height="100%"   />
            </a>
            <p></p>
            <p class = "text-white">Click on the image above to see a list of all the employees in the database.</p>
          </div>

          <div class="col-lg-4">
            <a href='/Vehicles'>
              <img src={Car} width="100%" height="100%"   />
            </a>
            <p></p>
            <p class = "text-white">Click on the image above to see a list of all the vehicles in the database.</p>
          </div>
          
          <div class="col-lg-4">
            <a href='/Parts'>
              <img src={cParts} width="75%" height="50%"   />
            </a>
            <p class = "text-white">Click on the image above to see a list of all the parts in the database.</p>
          </div>
        </div>

          <div class="row align-items-center  my-5">
            <div class="col-lg-5">
              <h1 class="font-weight-light text-white">Customers</h1>
            </div>
            <div class="col-lg-5">
              <h1 class="font-weight-light text-white">Repairs</h1>
            </div>
          </div>
          <div class="row align-items-center  my-5">
        <div class="col-lg-4">
            <a href='/Customers'>
              <img src={Customer} width="100%" height="100%"   />
            </a>
            <p></p>
            <p class ="text-white">Click on the image above to see a list of all the customers in the database.</p>
          </div>
          <div class="col-lg-4">
            <a href='/Repairs'>
              <img src={Repair} width="100%" height="100%"   />
            </a>
            <p></p>
            <p class ="text-white">Click on the image above to see a list of all the repairs in the database.</p>
          </div>
          </div>

      </div>
    </div>
  );
}

export default Home;

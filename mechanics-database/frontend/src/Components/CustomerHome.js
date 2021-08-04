import React from "react";
import Car from "./Car1.png";
import Repair from "./Repairs.png";
import Customer from "./Customer.png";
function CustomerHome() {
  return (
    <div className="home">
      <div class="container">

        <div class="row align-items-center  my-5">
          <div class="col-lg-4">
              <h1 class="font-weight-light">Manage Vehicle Info</h1>
          </div>
          <div class="col-lg-4">
            <h1 class="font-weight-light">Check Repair Status</h1>
          </div>
          <div class="col-lg-4">
            <h1 class="font-weight-light">Manage Your Account</h1>
          </div>
        </div>

        <div class="row align-items-center  my-5">
          <div class="col-lg-4">
            <a href='/CustomerVehicle'>
              <img src={Car} width="100%" height="100%"   />
            </a>
            <p></p>
            <p>Click on the image above to manage your vehicle information.</p>
          </div>
          <div class="col-lg-4">
            <a href='/CustomerRepair'>
              <img src={Repair} width="100%" height="100%"   />
            </a>
            <p></p>
            <p>Click on the image above to check the status of your vehicle's repair.</p>
          </div>
          <div class="col-lg-4">
            <a href='/CustomerAccount'>
              <img src={Customer} width="75%" height="50%"   />
            </a>
            <p></p>
            <p>Click on the image above to manage your account info.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerHome;

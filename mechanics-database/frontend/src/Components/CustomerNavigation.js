import React from "react";
import { Link, withRouter } from "react-router-dom";

function CustomerNavigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/CustomerHome">
            The Mechanic's Database
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">



              <li
                class={`nav-item  ${
                  props.location.pathname === "/CustomerVehicle" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/CustomerVehicle">
                  Manage Vehicle Information
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/CustomerRepair" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/CustomerRepair">
                  Check Repair Status
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/CustomerAccount" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/CustomerAccount">
                  Manage Your Account
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(CustomerNavigation);
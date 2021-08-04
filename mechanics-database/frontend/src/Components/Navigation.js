import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            The Mechanic's Database
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">



              <li
                class={`nav-item  ${
                  props.location.pathname === "/Employees" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Employees">
                  Employees
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Vehicles" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Vehicles">
                  Vehicles
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Parts" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Parts">
                  Parts
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Customers" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Customers">
                  Customers
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Repairs" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Repairs">
                  Repairs
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);

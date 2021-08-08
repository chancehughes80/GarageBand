import React, {useState} from "react";
import { BrowserRouter as Router,Link, Route, Switch } from "react-router-dom";
import {Home, Login, Employees, Salary, Vehicles, Parts, Repairs, Customers, Navigation, CustomerHome, CustomerVehicle, CustomerRepair, CustomerAccount, CustomerNavigation} from "./Components";

import './App.css';
import useToken from './useToken';

export default function App() {
  const { token, setToken } = useToken();
  
  //checks if login info was entered (i.e. not null)
  if(!token) {
    return <Login setToken={setToken} />
  }
    
  //gives employee login access to employee pages
  if(token == 'employeetoken'){
    return (
      <div class="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/Employees" exact component={() => <Employees />} />
            <Route path="/Vehicles" exact component={() => <Vehicles />} />
            <Route path="/Parts" exact component={() => <Parts />} />
            <Route path="/Repairs" exact component={() => <Repairs />} />
            <Route path="/Customers" exact component={() => <Customers />} />
          </Switch>
        </Router>
      </div>
    );
  }
  //gives customer login access to customer pages
  else if(token.includes('customertoken')){
    return(
      <div class="App">
        <Router>
          <CustomerNavigation />
          <Switch>
            <Route path="/" exact component={() => <CustomerHome />} />
            <Route path="/CustomerVehicle" exact component={() => <CustomerVehicle />} />
            <Route path="/CustomerRepair" exact component={() => <CustomerRepair />} />
            <Route path="/CustomerAccount" exact component={() => <CustomerAccount/>} />
          </Switch>
        </Router>
      </div>
      );
  }
}

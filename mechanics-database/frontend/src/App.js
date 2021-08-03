import React from "react";
import { BrowserRouter as Router,Link, Route, Switch } from "react-router-dom";
import {Home, Employees, Salary, Vehicles, Parts, Repairs, Customers, AddEmployee, Navigation} from "./Components";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Employees" exact component={() => <Employees />} />
          <Route path="/Salary" exact component={() => <Salary />} />
          <Route path="/Vehicles" exact component={() => <Vehicles />} />
          <Route path="/Parts" exact component={() => <Parts />} />
          <Route path="/Repairs" exact component={() => <Repairs />} />
          <Route path="/Customers" exact component={() => <Customers />} />
        </Switch>
      </Router>
    </div>
  );
}

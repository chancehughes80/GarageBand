import React, {useState} from "react";
import { BrowserRouter as Router,Link, Route, Switch } from "react-router-dom";
import {Home, Login, Employees, Vehicles, Parts, Repairs, Customers, Navigation} from "./Components";
import './App.css';
import useToken from './useToken';

export default function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
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

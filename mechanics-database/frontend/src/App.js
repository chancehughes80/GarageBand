import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Harper DB endpoint
            const API = 'http://127.0.0.1:5000/';

            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
         <Fragment>
            <header>
                <h1>Garage Band</h1>
            </header>
            <div className="form-container">
                <h2>Add Employee</h2>
                <form method="POST" action="http://127.0.0.1:5000/add-employee">
                    <div>
                        <label>Employee ID</label>
                        <input type="text" name="employee_id" required />
                    </div>
                    <div>
                        <label>Employee Name</label>
                        <input type="text" name="employee_name" required />
                    </div>
                    <div>
                        <label>Job</label>
                        <input type="text" name="job_title" required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="employee_password" required />
                    </div>
                    <div>
                        <button type="submit">Add Employee</button>
                    </div>
                </form>
              </div>
              <h2 style = {{display: 'flex',  justifyContent:'center'}}> List of Employees</h2>
              <section>
                  {apiData.map((Employee) => {
                      return (
                          <div className="employee-container" key={String(Employee.employee_id)}>
                              <h1>{Employee.employee_name}</h1>
                              <p>
                                  <strong>Employee ID:</strong> {Employee.employee_id}
                              </p>
                              <p>
                                  <strong>Job:</strong> {Employee.job_title}
                              </p>
                              <p>
                                  <strong>Password:</strong> {Employee.employee_password}
                              </p>
                          </div>
                      );
                  })}
              </section>
        </Fragment>
    );
};

export default App;

import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

function Employees() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/employee';

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

    return(
      <Fragment>
        <header>
                  <h1>Employees</h1>
        </header>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4">

                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/employee/add-employee">
                        <div>
                            <label>Employee ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Employee Name</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Employee Password</label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Job Title</label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <button type="submit">Add Employee</button>
                        </div>
                    </form>

           
                    <form method="PUT" action="http://127.0.0.1:5000/online/harperdb/employee/update-employee">
                         <div>
                             <label>Employee ID</label>
                             <input type="text" name="employee_id" required />
                         </div>
                         <div>
                             <label>Employee Name</label>
                             <input type="text" name="employee_name" required />
                         </div>
                         <div>
                             <label>Employee Password</label>
                             <input type="text" name="employee_password" required />
                         </div>
                         <div>
                             <label>Job Title</label>
                             <input type="text" name="job_title" required />
                         </div>
                         <div>
                             <button type="submit">Update Employee</button>
                         </div>
                     </form>

                     <form method="DELETE" action="http://127.0.0.1:5000/delete-employee">
                         <div>
                             <label>Employee ID</label>
                             <input type="text" name="employee_id" required />
                         </div>
                         <div>
                             <button type="submit">Delete Employee</button>
                         </div>
                    </form>
                </div>

                <div class="col-lg-8">
                    <main>
                        <section>
                            {apiData.map((Employee) => {
                                return (
                                    <div className="employee-container" key={String(Employee.employee_id)}>
                                        <h1>{Employee.employee_name}</h1>
                                        <p>
                                            <strong>ID:</strong> {Employee.employee_id}
                                        </p>
                                        <p>
                                            <strong>Job:</strong> {Employee.job_title}
                                        </p>
                                    </div>
                                );
                            })}
                         </section>
                     </main>
                </div>
            </div>
        </div>

      </Fragment>
    );
}

export default Employees;

import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
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
            <main>
                {loading === true ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <section>
                        {apiData.map((employee) => {
                            return (
                                <div className="employee-container" key={String(employee.employee_id)}>
                                    <h1>{employee.employee_name}</h1>
                                    <p>
                                        <strong>ID:</strong> {employee.employee_id}
                                    </p>
                                    <p>
                                        <strong>Job:</strong> {employee.job_title}
                                    </p>
                                </div>
                            );
                        })}
                    </section>
                )}
            </main>
        </Fragment>
    );
};

export default App;

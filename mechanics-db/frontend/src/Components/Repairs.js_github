import React, { Fragment, useState, useEffect } from 'react';
import './App.css';


function Repairs() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/parts';

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
        <main>
            <a href="/AddEmployee">Add Employee</a>
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
    );
}


export default Repairs;
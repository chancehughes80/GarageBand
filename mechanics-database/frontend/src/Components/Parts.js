import React, { Fragment, useState, useEffect } from 'react';
import './App.css';


function Parts() {
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
        <Fragment>
        <header>
                  <h1>Parts</h1>
        </header>
        <div class="container">
            <div class="row justify-items-center">
        <div class="col-lg-4 top" >
                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/employee/add-employee">
                        <div>
                            <label>Part ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Count</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Price </label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Model </label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <button type="submit">Add Part</button>
                        </div>
                    </form>

           
                    <form method="PUT" action="http://127.0.0.1:5000/online/harperdb/employee/update-employee">
                         <div>
                            <label>Part ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Count</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Price </label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Model </label>
                            <input type="text" name="job_title" required />
                        </div>
                         <div>
                             <button type="submit">Update Employee</button>
                         </div>
                     </form>

                     <form method="DELETE" action="http://127.0.0.1:5000/online/harperdb/employee/delete-employee">
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
            {loading === true ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <section>
                    {apiData.map((parts) => {
                        return (
                            <div className="employee-container" key={String(parts.part_id)}>
                                <h1>{parts.model}</h1>
                                <p>
                                    <strong>Count:</strong> {parts.part_count}
                                </p>
                                <p>
                                    <strong>Price:</strong> {parts.price}
                                </p>
                            </div>
                        );
                    })}
                 </section>
            )}
         </main>
         </div>
         </div>
         </div>
         </Fragment>
    );
}


export default Parts;
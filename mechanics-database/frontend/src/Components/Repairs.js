import React, { Fragment, useState, useEffect } from 'react';
import './App.css';


function Repair() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/repairs';

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
                  <h1>Repairs</h1>
        </header>
        <div class="container">
            <div class="row justify-items-center">
                <div class="col-lg-4 top" >
                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/employee/add-employee">
                        <div>
                            <label>Repair ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Repair Description</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Repair Time</label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Cost</label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <button type="submit">Add Repair</button>
                        </div>
                    </form>

           
                    <form method="PUT" action="http://127.0.0.1:5000/online/harperdb/employee/update-employee">
                         <div>
                             <label>Repair ID</label>
                             <input type="text" name="employee_id" required />
                         </div>
                         <div>
                             <label>Repair Description</label>
                             <input type="text" name="employee_name" required />
                         </div>
                         <div>
                             <label>Repair Time</label>
                             <input type="text" name="employee_password" required />
                         </div>
                         <div>
                             <label>Cost </label>
                             <input type="text" name="job_title" required />
                         </div>
                         <div>
                             <button type="submit">Update Repair</button>
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
                        <section>
                            {apiData.map((Repairs) => {
                                return (
                                    <div className="employee-container" key={String(Repairs.employee_id)}>
                                        <h1>{Repairs.repair_description}</h1>
                                        <p>
                                            <strong>ID:</strong> {Repairs.repair_id}
                                        </p>
                                        <p>
                                            <strong>Cost:</strong> {Repairs.repair_cost}
                                        </p>
                                        <p>
                                            <strong>Total Time:</strong> {Repairs.estimated_time_for_repair} min
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


export default Repair;
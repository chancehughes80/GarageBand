import React, { Fragment, useState, useEffect } from 'react';
import './App.css';


function Customers() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/customer';

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
                  <h1>Customers</h1>
        </header>
        <div class="container">
            <div class="row justify-items-center">
        <div class="col-lg-4 top" >
                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/employee/add-employee">
                        <div>
                            <label>Customer ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Billing Address</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Customer Name </label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Phone Number </label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <label>Email Address </label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <label>Password </label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <button type="submit">Add Customer</button>
                        </div>
                    </form>

           
                    <form method="PUT" action="http://127.0.0.1:5000/online/harperdb/employee/update-employee">
                         <div>
                            <label>Customer ID</label>
                            <input type="text" name="employee_id" required />
                        </div>
                        <div>
                            <label>Billing Address</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Customer Name </label>
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
                    {apiData.map((Customers) => {
                        return (
                            <div className="employee-container" key={String(Customers.part_id)}>
                                <h1>{Customers.customer_name}</h1>
                                <p>
                                    <strong>ID:</strong> {Customers.customer_id}
                                </p>
                                <p>
                                    <strong>Phone number:</strong> {Customers.phone_number}
                                </p>
                                <p>
                                    <strong>Email address:</strong> {Customers.email_address}
                                </p>
                                <p>
                                    <strong>Billing address:</strong> {Customers.billing_address}
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


export default Customers;
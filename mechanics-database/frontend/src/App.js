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
        <main>
        <a href="/AddCustomer">Add Customer</a> <br></br>
        <a href="/UpdateCustomer">Update Customer</a> <br></br>
        <a href="/DeleteCustomer">Delete Customer</a> <br></br>
        {loading === true ? (
            <div>
                <h1>Loading...</h1>
            </div>
        ) : (
            <section>
                {apiData.map((customer) => {
                    return (
                        <div className="customer-container" key={String(customer.customer_id)}>
                            <h1>{customer.customer_name}</h1>
                            <p>
                                <strong>ID:</strong> {customer.customer_id}
                            </p>
                            <p>
                                <strong>Password:</strong> {customer.customer_password}
                            </p>
                        </div>
                    );
                })}
             </section>
        )}
     </main>
    );
};

export default App;

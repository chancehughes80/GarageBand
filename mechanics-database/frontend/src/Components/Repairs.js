import React, { Fragment, useState, useEffect } from 'react';
import './App.css';


function Repair() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/repair';

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
            <a href="/AddRepairs">Add Repairs</a>
            {loading === true ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <section>
                    {apiData.map((repair) => {
                        return (
                            <div className="repair-container" key={String(repair.repair_id)}>
                                <h1>{repair.repair_description}</h1>
                                <p>
                                    <strong>ID:</strong> {repair.repair_id}
                                </p>
                                <p>
                                    <strong>Job:</strong> {repair.repair_cost}
                                </p>
                            </div>
                        );
                    })}
                 </section>
            )}
         </main>
    );
}


export default Repair;
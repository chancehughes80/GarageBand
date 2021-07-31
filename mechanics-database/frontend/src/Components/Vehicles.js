import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

function Vehicles() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/vehicle';

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
            {loading === true ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <section>
                    {apiData.map((vehicle) => {
                        return (
                            <div className="employee-container" key={String(vehicle.vin)}>
                                <h1>{vehicle.model}</h1>
                                <p>
                                    <strong>Plate #:</strong> {vehicle.plate}
                                </p>
                                <p>
                                    <strong>Year:</strong> {vehicle.vehicle_year}
                                </p>
                            </div>
                        );
                    })}
                 </section>
            )}
         </main>
    );
}

export default Vehicles;
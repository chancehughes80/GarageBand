import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb';

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
                <h2>Add Part</h2>
                <form method="POST" action="http://127.0.0.1:5000/online/harperdb/parts/add-part">
                    <div>
                        <label>Part ID</label>
                        <input type="text" name="part_id" required />
                    </div>
                    <div>
                        <label>Part price</label>
                        <input type="number" name="price" required />
                    </div>
                    <div>
                        <label>Model</label>
                        <input type="text" name="model" required />
                    </div>
                    <div>
                        <label>Count</label>
                        <input type="number" name="count" required />
                    </div>
                    <div>
                        <button type="submit">Add Part</button>
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
                        {apiData.map((parts) => {
                            return (
                                <div className="employee-container" key={String(parts.part_id)}>
                                    <h1>{parts.part_id}</h1>
                                    <p>
                                        <strong>ID:</strong> {parts.part_id}
                                    </p>
                                    <p>
                                        <strong>Count:</strong> {parts.count}
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
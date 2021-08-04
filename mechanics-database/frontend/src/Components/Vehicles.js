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
        <Fragment>
          <header>
                    <h1>Vehicles</h1>
          </header>
          <form method="POST" action="http://127.0.0.1:5000/add-vehicle">
              <div>
                  <label>VIN</label>
                  <input type="text" name="VIN" required />
              </div>
              <div>
                  <label>Model</label>
                  <input type="text" name="model" required />
              </div>
              <div>
                  <label>Year</label>
                  <input type="text" name="year" required />
              </div>
              <div>
                  <label>Color</label>
                  <input type="text" name="color" required />
              </div>
              <div>
                  <label>Plate</label>
                  <input type="text" name="plate" required />
              </div>
              <div>
                  <label>Customer ID</label>
                  <input type="text" name="customer_id" required />
              </div>
              <div>
                  <button type="submit">Add Vehicle</button>
              </div>
          </form>

          <main>
              <section>
                  {apiData.map((Vehicle) => {
                      return (
                          <div className="employee-container" key={String(Vehicle.VIN)}>
                              <h1>{Vehicle.VIN}</h1>
                              <p>
                                  <strong>Model:</strong> {Vehicle.model}
                              </p>
                              <p>
                                <strong>Year:</strong> {Vehicle.year}
                              </p>
                              <p>
                                <strong>Color:</strong> {Vehicle.color}
                              </p>
                              <p>
                                <strong>Plate:</strong> {Vehicle.plate}
                              </p>
                              <p>
                                <strong>Customer ID:</strong> {Vehicle.customer_id}
                              </p>

                          </div>
                      );
                  })}
               </section>
           </main>
           <form method="PUT" action="http://127.0.0.1:5000/update-vehicle">
               <div>
                   <label>VIN</label>
                   <input type="text" name="VIN" required />
               </div>
               <div>
                   <label>Model</label>
                   <input type="text" name="model" required />
               </div>
               <div>
                   <label>Year</label>
                   <input type="text" name="year" required />
               </div>
               <div>
                   <label>Color</label>
                   <input type="text" name="color" required />
               </div>
               <div>
                   <label>Plate</label>
                   <input type="text" name="plate" required />
               </div>
               <div>
                   <button type="submit">Update Vehicle</button>
               </div>
           </form>
           <form method="DELETE" action="http://127.0.0.1:5000/delete-vehicle">
               <div>
                   <label>VIN</label>
                   <input type="text" name="VIN" required />
               </div>
               <div>
                   <button type="submit">Delete Vehicle</button>
               </div>
             </form>
        </Fragment>
      );
}

export default Vehicles;

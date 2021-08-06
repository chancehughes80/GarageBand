import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function CustomerRepair() {
  var columns = [
      { title: 'Repair ID', field: 'repair_id', editable: 'onAdd'},
      { title: 'VIN', field: 'VIN'},
      { title: 'Status', field: 'repair_status'},
      { title: 'Actual Time for Repair', field: 'actual_time'}
    ]

    const [status, setStatus] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    var aValue = localStorage.getItem('token');
    let str = aValue.substring(23,26);

  useEffect(() => {
      const getAPI = () => {
          // Change this endpoint to whatever local or online address you have
          // Local PostgreSQL Database
          const API = 'http://127.0.0.1:5000/online/harperdb/repair-vehicle/'+str;

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
  return(
      <Fragment>
        <header>
                  <h1>Check Your Repair Status</h1>
        </header>
        <div class="container">

                    <main class="spacer">

                        <MaterialTable
                            title="Your Repairs"
                            columns={columns}
                            data={apiData}
                            style={{
                                border: "3px solid #744F28",
                                maxWidth: "1450px",
                                overflow: "scroll",
                                background: "#eaeaea",
                                color: "#500000",
                            }}
                            options={{
                               headerStyle: {
                                    background: "#d1d1d1",
                                    color: '#500000',
                                },
                                cellStyle: {
                                    color: '#500000',
                                }
                            }}
                        />
                    </main>
                    <p id="token"> </p>


        </div>
      </Fragment>
    );


}

export default CustomerRepair;

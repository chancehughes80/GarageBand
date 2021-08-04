import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import ReactDOM from 'react-dom'
import './App.css';
const Type = React.lazy(()=>import('./EmployeeRepair'));
const Type2 = React.lazy(()=>import('./RepairParts'));
const Type3 = React.lazy(()=>import('./VehicleRepair'));

function Repair() {
      var columns = [
      { title: 'Repair ID', field: 'repair_id', editable: 'onAdd'},
      { title: 'Description', field: 'repair_description'},
      { title: 'Time', field: 'estimated_time_for_repair'},
      { title: 'Cost', field: 'repair_cost'}
    ]
    const [status, setStatus] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([])

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
    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.repair_id === undefined){
          errorList.push("Please enter Repair ID: ")
        }
        if(newData.repair_description === undefined){
          errorList.push("Please enter Repair description")
        }
        if(newData.estimated_time_for_repair === undefined){
          errorList.push("Please enter a time")
        }
        if(newData.repair_cost === undefined){
          errorList.push("Please enter an cost")
        }
        const url = 'http://127.0.0.1:5000/online/harperdb/repair/add-repair';
        if(errorList.length < 1){ //no error
          axios.post(url, newData)
          .then(res => {
            let dataToAdd = [...data];
            dataToAdd.push(newData);
            setData(dataToAdd);
            resolve()
            setErrorMessages([])
            setIsError(false)
          })
          .catch(error => {
            setErrorMessages(["Cannot add data. Server error!"])
            setIsError(true)
            resolve()
          })
        }else{
          setErrorMessages(errorList)
          setIsError(true)
          resolve()
        }
        window.location.reload(false);

    }

    const handleRowDelete = (oldData, resolve) =>{
        const url = 'http://127.0.0.1:5000/online/harperdb/repair/delete-repair/' + oldData.repair_id;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.repair_id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve()
          })
          .catch(error => {
             setErrorMessages(["Delete failed! Server error"])
             setIsError(true)
             resolve()
           })
           window.location.reload(false);
      }

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.repair_id === undefined){
          errorList.push("Please enter Repair ID: ")
        }
        if(newData.repair_description === undefined){
          errorList.push("Please enter Repair description")
        }
        if(newData.estimated_time_for_repair === undefined){
          errorList.push("Please enter a time")
        }
        if(newData.repair_cost === undefined){
          errorList.push("Please enter an cost")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/repair/update-repair-vehicle", newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.employee_id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
                setIsError(false)
                setErrorMessages([])
            })
            .catch(error => {
                setErrorMessages(["Update failed!"])
                setIsError(true)
                resolve()
            })
        }else{
            setErrorMessages(errorList)
            setIsError(true)
            resolve()
        }
        window.location.reload(false);
    }
    return(
      <Fragment>
        <header>
                  <h1>Repairs</h1>
        </header>
        <div class="container">

                    <main class="spacer">

                        <MaterialTable
                            title="Repair"
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
                            editable={{
                                onRowAdd: (newData) =>
                                    new Promise((resolve) => {
                                        handleRowAdd(newData, resolve)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        handleRowUpdate(newData, oldData, resolve);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve) => {
                                        handleRowDelete(oldData, resolve)
                                  }),
                            }}
                        />
                    </main>
            <div class="row justify-items-center">
                <div class="col-lg-6" >
                      <Suspense id="load" fallback={<div>Loading...</div>}>
                        <Type />
                      </Suspense>
                </div>
                
                <div class="col-lg-6" >
                      <Suspense id="load" fallback={<div>Loading...</div>}>
                        <Type2 />
                      </Suspense>
                </div>

                <div>
                      <Suspense id="load" fallback={<div>Loading...</div>}>
                        <Type3 />
                      </Suspense>
                </div>

            </div>

        </div>
      </Fragment>
    );
}

export default Repair;

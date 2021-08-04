import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';


function VehicleRepair() {

    var columns = [
        { title: 'VIN', field: 'VIN', editable: 'onAdd'},
        { title: 'Repair ID', field: 'repair_id'},
        { title: 'Status', field: 'repair_status'},
        { title: 'Actual Time for Repair', field: 'actual_time'}
      ]

    const [status, setStatus] = useState(null);
    const[VIN, setVIN] = useState('');
    const[repair_id, setID] = useState('');
    const[repair_status, setRepairStatus] = useState('');
    const[actual_time, setTime] = useState('');

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/vehicle-repair';

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

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
          VIN: VIN,
          repair_id: repair_id,
          status: vehicle_year,
          actual_time: actual_time,
        }
        axios.put('http://127.0.0.1:5000/online/harperdb/vehicle-repair/update-vehicle-repair', data)
          .then(res => {
            setData(res.data);
            setVIN('');
            setID('');
            setRepairStatus('');
            setTime('');
            setLoading(false);
          }).catch(err => {
            setLoading(false);
            setIsError(true);
          });
        }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.VIN === undefined){
            errorList.push("Please enter VIN: ")
        }
        if(newData.repair_id === undefined){
            errorList.push("Please enter Repair ID")
        }
        if(newData.repair_status === undefined){
            errorList.push("Please enter a Status")
        }
        if(newData.actual_time === undefined){
            errorList.push("Please enter an Actual Repair Time")
        }
        const url = 'http://127.0.0.1:5000/online/harperdb/vehicle-repair/add-vehicle-repair';
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
        const url = 'http://127.0.0.1:5000/online/harperdb/vehicle-repair/delete-vehicle-repair/' + oldData.VIN;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.VIN;
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
        if(newData.VIN === undefined){
            errorList.push("Please enter VIN: ")
        }
        if(newData.repair_id === undefined){
            errorList.push("Please enter Repair ID")
        }
        if(newData.repair_status === undefined){
            errorList.push("Please enter a Status")
        }
        if(newData.actual_time === undefined){
            errorList.push("Please enter an Actual Repair Time")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/vehicle-repair/update-vehicle-repair", newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.VIN;
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
                    <h1>Vehicle Repair</h1>
          </header>
          <div class="container">
  
                      <main class="spacer">
  
                          <MaterialTable
                              title="VehicleRepair"
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
  
  
          </div>
        </Fragment>
      );

    
}

export default VehicleRepair;

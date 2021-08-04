import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function CustomerVehicle() {

  var columns = [
    { title: 'VIN', field: 'VIN', editable: 'onAdd'},
    { title: 'Model', field: 'model'},
    { title: 'Color', field: 'color'},
    { title: 'Plate', field: 'plate'},
    { title: 'Year', field: 'vehicle_year'},
    { title: 'Customer ID', field: 'customer_id'}

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
          const API = 'http://127.0.0.1:5000/online/harperdb/vehicle/451';

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
    if(newData.VIN === undefined){
        errorList.push("Please enter VIN: ")
    }
    if(newData.model === undefined){
        errorList.push("Please enter Model")
    }
    if(newData.year === undefined){
        errorList.push("Please enter a Year")
    }
    if(newData.color === undefined){
        errorList.push("Please enter a Color")
    }
    if(newData.plate === undefined){
        errorList.push("Please enter a Plate ID")
    }
    if(newData.customer_id === undefined){
        errorList.push("Please enter an Customer ID")
    }
    const url = 'http://127.0.0.1:5000/online/harperdb/vehicle/add-vehicle';
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

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.VIN === undefined){
      errorList.push("Please enter VIN: ")
    }
    if(newData.model === undefined){
      errorList.push("Please enter model:")
    }
    if(newData.color === undefined){
      errorList.push("Please enter a color:")
    }
    if(newData.plate === undefined){
      errorList.push("Please enter a plate number:")
    }
    if(newData.year === undefined){
      errorList.push("Please enter a year:")
    }
    if(errorList.length < 1){
        axios.put("http://127.0.0.1:5000/online/harperdb/vehicle/update-vehicle", newData)
        .then(res => {
            const dataUpdate = [...data];
            const index = oldData.tableData.customer_id;
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
                <h1>Manage Your Vehicle Information</h1>
      </header>
     
      <div class="container">

<main class="spacer">

    <MaterialTable
        title="Vehicles"
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
                })
                                
        }}
    />
</main>


</div>
    </Fragment>
  );
}
export default CustomerVehicle;
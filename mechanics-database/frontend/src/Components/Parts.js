import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';
//import Employee from './Employees';
const Type = React.lazy(()=>import('./PartsType'));

function Parts() {
    var columns = [
        { title: 'Part ID', field: 'part_id', editable: 'onAdd'},
        { title: 'Count', field: 'part_count'},
        { title: 'Price', field: 'price'},
        { title: 'Model', field: 'model'}
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
            const API = 'http://127.0.0.1:5000/online/harperdb/parts';

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
        if(newData.part_id === undefined){
          errorList.push("Please enter Part ID: ")
        }
        if(newData.part_count === undefined){
          errorList.push("Please enter Part Count")
        }
        if(newData.price === undefined){
          errorList.push("Please enter a Price")
        }
        if(newData.model === undefined){
          errorList.push("Please enter a Model")
        }
        const url = 'http://127.0.0.1:5000/online/harperdb/parts/add-part';
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
        const url = 'http://127.0.0.1:5000/online/harperdb/parts/delete-part/' + oldData.part_id;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.part_id;
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
        if(newData.part_id == ""){
            errorList.push("Please enter Employee ID:")
        }
        if(newData.part_count == ""){
            errorList.push("Please enter Employee Name")
        }
        if(newData.price == ""){
            errorList.push("Please enter Employee Password")
        }
        if(newData.model == ""){
            errorList.push("Please enter Job Title")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/parts/update-part", newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.part_id;
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
                      <h1>Parts</h1>
            </header>
            <div class="container">
                <main class="spacer">
                    <MaterialTable
                        title="Parts"
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
                <section>
                <Suspense id="load" fallback={<div>Loading...</div>}>
                    <Type />
                  </Suspense>
                </section>
             </div>
         </Fragment>
    );
}

export default Parts;
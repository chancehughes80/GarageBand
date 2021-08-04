import React, { Fragment, useState, useEffect, Suspense, lazy  } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';
const Type = React.lazy(()=>import('./Salary'));

function Employees() {
      var columns = [
      { title: 'Employee ID', field: 'employee_id', editable: 'onAdd'},
      { title: 'Name', field: 'employee_name'},
      { title: 'Job Title', field: 'job_title'},
      { title: 'Employee Password', field: 'employee_password'}
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
            const API = 'http://127.0.0.1:5000/online/harperdb/employee';

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
        if(newData.employee_id === undefined){
          errorList.push("Please enter Employee ID: ")
        }
        if(newData.employee_name === undefined){
          errorList.push("Please enter Employee Name")
        }
        if(newData.job_title === undefined){
          errorList.push("Please enter a Job Title")
        }
        if(newData.employee_password === undefined){
          errorList.push("Please enter an Employee Password")
        }
        const url = 'http://127.0.0.1:5000/online/harperdb/employee/add-employee';
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
        const url = 'http://127.0.0.1:5000/online/harperdb/employee/delete-employee/' + oldData.employee_id;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.employee_id;
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
        if(newData.employee_id == ""){
            errorList.push("Please enter Employee ID:")
        }
        if(newData.employee_name == ""){
            errorList.push("Please enter Employee Name")
        }
        if(newData.employee_password == ""){
            errorList.push("Please enter Employee Password")
        }
        if(newData.job_title == ""){
            errorList.push("Please enter Job Title")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/employee/update-employee", newData)
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
                  <h1>Employees</h1>
        </header>
        <div class="container">

                    <main class="spacer">

                        <MaterialTable
                            title="Employees"
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

export default Employees;

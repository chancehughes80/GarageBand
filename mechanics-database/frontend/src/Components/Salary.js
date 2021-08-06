import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function Salary() {
      var columns = [
      { title: 'Job Title', field: 'job_title', editable: 'onAdd'},
      { title: 'Wage', field: 'wage'}
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
            const API = 'http://127.0.0.1:5000/online/salary';

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
        if(newData.job_title === undefined){
          errorList.push("Please enter Job Title")
        }
        if(newData.wage === undefined){
          errorList.push("Please enter Wage")
        }
        const url = 'http://127.0.0.1:5000/online/harperdb/add-salary';
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
        const url = 'http://127.0.0.1:5000/online/harperdb/delete-salary/' + oldData.job_title;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.job_title;
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
        if(newData.job_title == ""){
            errorList.push("Please enter job title")
        }
        if(newData.wage == ""){
            errorList.push("Please enter wage")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/update-salary", newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.job_title;
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
        <div class="container">

                    <main class="spacer">

                        <MaterialTable
                            title="Salary"
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

export default Salary;

import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function Employees() {
      var columns = [
      { title: 'Employee ID', field: 'employee_id' },
      { title: 'Name', field: 'employee_name' },
      { title: 'Job Title', field: 'job_title' },
      {title: 'Employee Password', field: 'employee_password'}
    ]
    const [status, setStatus] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIserror] = useState(false)
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
           setIserror(true)
           resolve()
         })
         window.location.reload(false);
    }
    // const handleRowUpdate = (newData, oldData, resolve) => {
    //   //validation
    //     let errorList = []
    //     if(newData.employee_id == ""){
    //       errorList.push("Please enter Employee ID:")
    //     }
    //     if(newData.employee_name == ""){
    //       errorList.push("Please enter Employee Name")
    //     }
    //     if(newData.employee_password == ""){
    //       errorList.push("Please enter Employee Password")
    //     }
    //     if(newData.job_title == ""){
    //       errorList.push("Please enter Job Title")
    //     }
    //   if(errorList.length < 1){
    //     axios.put("http://127.0.0.1:5000/online/harperdb/employee/update-employee", newData)
    //       .then(res => {
    //         const dataUpdate = [...data];
    //         const index = oldData.tableData.employee_id;
    //         dataUpdate[index] = newData;
    //         setData([...dataUpdate]);
    //         resolve()
    //         setIserror(false)
    //         setErrorMessages([])
    //       })
    //       .catch(error => {
    //         setErrorMessages(["Update failed!"])
    //         setIserror(true)
    //         resolve()
    //     })
    //   }else{
    //     setErrorMessages(errorList)
    //     setIserror(true)
    //     resolve()
    //   }
    // }
    return(
      <Fragment>
        <header>
                  <h1>Employees</h1>
        </header>
        <div class="container">
            <div class="row justify-items-center">
                <div class="col-lg-4 top" >
                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/employee/add-employee">
                        <div>
                            <label>Employee ID</label>
                            <input type="text" name="employee_id" required />

                        </div>
                        <div>
                            <label>Employee Name</label>
                            <input type="text" name="employee_name" required />
                        </div>
                        <div>
                            <label>Employee Password</label>
                            <input type="text" name="employee_password" required />
                        </div>
                        <div>
                            <label>Job Title</label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <button type="submit">Add Employee</button>
                        </div>
                    </form>

                    <form method="PUT" action="http://127.0.0.1:5000/online/harperdb/employee/update-employee">
                         <div>
                             <label>Employee ID</label>
                             <input type="text" name="employee_id" required />
                         </div>
                         <div>
                             <label>Employee Name</label>
                             <input type="text" name="employee_name" required />
                         </div>
                         <div>
                             <label>Employee Password</label>
                             <input type="text" name="employee_password" required />
                         </div>
                         <div>
                             <label>Job Title</label>
                             <input type="text" name="job_title" required />
                         </div>
                         <div>
                             <button type="submit">Update Employee</button>
                         </div>
                     </form>
                </div>

                <div class="col-lg-8 top">
                    <main>
                        <MaterialTable
                            title="Employees"
                            columns={columns}
                            data={apiData}
                            editable={{
                                // onRowUpdate: (newData, oldData) =>
                                //   new Promise((resolve) => {
                                //     handleRowUpdate(newData, oldData, resolve);
                                //   }),
                                onRowDelete: oldData =>
                                  new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                  }),
                            }}
                        />
                    </main>
                </div>
            </div>
        </div>
      </Fragment>
    );
}

export default Employees;

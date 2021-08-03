import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function Employees() {
    const [status, setStatus] = useState(null);
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
    const removeData = (id) =>{
      const url = 'http://127.0.0.1:5000/online/harperdb/employee/delete-employee/' + id;
      axios.delete(url)
        .then(() => setStatus('Delete successful'));
      window.location.reload(false);
      }
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [columns, setColumns] = useState([
    { title: 'Employee ID', field: 'employee_id' },
    { title: 'Name', field: 'employee_name' },
    { title: 'Job Title', field: 'job_title' },
  ]);
    const [data, setData] = useState([])

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
                                onRowAdd: newData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      setData([...data, newData]);
                                      
                                      resolve();
                                    }, 1000)
                                  }),
                                onRowUpdate: (newData, oldData) =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      const dataUpdate = [...data];
                                      const index = oldData.tableData.id;
                                      dataUpdate[index] = newData;
                                      setData([...dataUpdate]);

                                      resolve();
                                    }, 1000)
                                  }),
                                onRowDelete: oldData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      const dataDelete = [...data];
                                      const index = oldData.tableData.id;
                                      dataDelete.splice(index, 1);
                                      setData([...dataDelete]);
                                      
                                      resolve()
                                    }, 1000)
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

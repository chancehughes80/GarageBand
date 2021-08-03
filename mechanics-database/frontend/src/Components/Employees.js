import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Employees() {
    const [status, setStatus] = useState(null);
    const[employee_id, setID] = useState('');
    const[employee_name, setName] = useState('');
    const[employee_password, setPassword] = useState('');
    const[job_title, setJob] = useState('');
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
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
    const handleSubmit = () => {
      setLoading(true);
      setIsError(false);
      const data = {
        employee_id: employee_id,
        employee_name: employee_name,
        job_title: job_title,
        employee_password: employee_password
      }
      axios.put('http://127.0.0.1:5000/online/harperdb/employee/update-employee', data)
        .then(res => {
          setData(res.data);
          setID('');
          setName('');
          setPassword('');
          setJob('');
          setLoading(false);
        }).catch(err => {
          setLoading(false);
          setIsError(true);
        });
      }
    const removeData = (id) =>{
      const url = 'http://127.0.0.1:5000/online/harperdb/employee/delete-employee/' + id;
      axios.delete(url)
        .then(() => setStatus('Delete successful'));
      window.location.reload(false);
      }
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

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


                    <form>
                         <div>
                             <label>Employee ID</label>
                             <input type="text" value = {employee_id} onChange = {e => setID(e.target.value)} required />
                         </div>
                         <div>
                             <label>Employee Name</label>
                             <input type="text" name="employee_name" value = {employee_name} onChange = {e => setName(e.target.value)} required />
                         </div>
                         <div>
                             <label>Employee Password</label>
                             <input type="text" name="employee_password" value = {employee_password} onChange = {e => setPassword(e.target.value)} required />
                         </div>
                         <div>
                             <label>Job Title</label>
                             <input type="text" name="job_title" value = {job_title} onChange = {e => setJob(e.target.value)} required />
                         </div>
                         <div>
                             <button type="submit" onClick = {handleSubmit}>Update Employee</button>
                         </div>
                     </form>
                </div>

                <div class="col-lg-8">
                    <main>
                        <section>
                            {apiData.map((Employee) => {
                                return (
                                    <div className="employee-container" key={String(Employee.employee_id)}>
                                        <h1>{Employee.employee_name}</h1>
                                        <p>
                                            <strong>ID:</strong> {Employee.employee_id}
                                        </p>
                                        <p>
                                            <strong>Job:</strong> {Employee.job_title}
                                        </p>
                                        <p>
                                            <strong>Password:</strong> {Employee.employee_password}
                                        </p>
                                        <p>
                                            <button onClick={() => removeData(Employee.employee_id)}>Delete</button>
                                        </p>
                                    </div>
                                );
                            })}
                         </section>
                     </main>
                </div>
            </div>
        </div>
      </Fragment>
    );
}

export default Employees;
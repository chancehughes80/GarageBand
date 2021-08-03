import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function Salary() {
    var columns = [
      { title: 'Job Title', field: 'job_title' },
      {title: 'Wage', field: 'wage'}
    ]
    const [status, setStatus] = useState(null);
    const[job_title, setJob] = useState('');
    const[wage, setWage] = useState('');
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([])
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/salary';

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
        job_title: job_title,
        wage: wage,
      }
      axios.put('http://127.0.0.1:5000/online/harperdb/salary/update-salary', data)
        .then(res => {
          setData(res.data);
          setJob('');
          setWage('');
          setLoading(false);
        }).catch(err => {
          setLoading(false);
          setIsError(true);
        });
      }
      const handleRowDelete = (oldData, resolve) =>{
        const url = 'http://127.0.0.1:5000/online/harperdb/salary/delete-salary/' + oldData.job_title;
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


    return(
      <Fragment>
        <header>
                  <h1>Salary</h1>
        </header>
        <div class="container">
            <div class="row justify-items-center">
                <div class="col-lg-4 top" >
                    <form method="POST" action="http://127.0.0.1:5000/online/harperdb/salary/add-salary">
                        <div>
                            <label>Job Title</label>
                            <input type="text" name="job_title" required />
                        </div>
                        <div>
                            <label>Wage</label>
                            <input type="text" name="wage" required />
                        </div>
                        <div>
                            <button type="submit">Add Salary</button>
                        </div>
                    </form>


                    <form>
                         <div>
                             <label>Job Title</label>
                             <input type="text" name="job_title" value = {job_title} onChange = {e => setJob(e.target.value)} required />
                         </div>
                         <div>
                             <label>Wage</label>
                             <input type="text" name = "wage" value = {wage} onChange = {e => setWage(e.target.value)} required />
                         </div>
                         <div>
                             <button type="submit" onClick = {handleSubmit}>Update Wage</button>
                         </div>
                     </form>
                </div>

                <div class="col-lg-8">
                    <main>

                        <MaterialTable
                            title="Salary"
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

export default Salary;

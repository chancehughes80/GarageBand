import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

function Salary() {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:3000/online/harperdb/salary';

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
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    return(
      <Fragment>
        <header>
                  <h1>Salary</h1>
        </header>
        <form method="POST" action="http://127.0.0.1:3000/add-salary">
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

        <main>
            <section>
                {apiData.map((Salary) => {
                    return (
                        <div className="employee-container" key={String(Salary.job_title)}>
                            <h1>{Salary.job_title}</h1>
                            <p>
                                <strong>Wage:</strong> {Salary.wage}
                            </p>
                        </div>
                    );
                })}
             </section>
         </main>
         <form method="PUT" action="http://127.0.0.1:3000/update-salary">
             <div>
                 <label>Job Title</label>
                 <input type="text" name="job_title" required />
             </div>
             <div>
                 <label>Wage</label>
                 <input type="text" name="wage" required />
             </div>
             <div>
                 <button type="submit">Update Salary</button>
             </div>
         </form>
         <form method="DELETE" action="http://127.0.0.1:3000/delete-salary">
             <div>
                 <label>Job Title</label>
                 <input type="text" name="job_title" required />
             </div>
             <div>
                 <button type="submit">Delete Salary</button>
             </div>
           </form>
      </Fragment>
    );
}
export default Salary;

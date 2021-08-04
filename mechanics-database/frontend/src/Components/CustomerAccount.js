import React, { Fragment, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';

function CustomerAccount() {
    var columns = [
    { title: 'Customer ID', field: 'customer_id', editable: 'onAdd'},
    { title: 'Name', field: 'customer_name'},
    { title: 'Billing Address', field: 'billing_address'},
    { title: 'Email Address', field: 'email_address'},
    { title: 'Phone Number', field: 'phone_number'},
    { title: 'Customer Password', field: 'customer_password'}
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
            const API = 'http://127.0.0.1:5000/online/harperdb/customer/451';

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
    
    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.customer_id === undefined){
          errorList.push("Please enter Customer ID: ")
        }
        if(newData.customer_name === undefined){
          errorList.push("Please enter Customer Name")
        }
        if(newData.billing_address === undefined){
          errorList.push("Please enter a billing_address")
        }
        if(newData.email_address === undefined){
          errorList.push("Please enter a Email Address")
        }
        if(newData.phone_number === undefined){
          errorList.push("Please enter a Phone Number")
        }
        if(newData.customer_password === undefined){
          errorList.push("Please enter an Customer Password")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/customer/update-customer", newData)
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
                  <h1>Customers</h1>
        </header>
        <div class="container">

                    <main class="spacer">

                        <MaterialTable
                            title="Customers"
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
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        handleRowUpdate(newData, oldData, resolve);
                                    }),    
                            }}
                        />
                    </main>


        </div>
      </Fragment>
    );
}
export default CustomerAccount;

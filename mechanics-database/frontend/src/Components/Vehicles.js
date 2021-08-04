import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './App.css';
const CarType = React.lazy(()=>import('./VehicleType'));
const CarRepair = React.lazy(()=>import('./VehicleRepair'));

function Vehicles() {

    var columns = [
        { title: 'VIN', field: 'VIN', editable: 'onAdd'},
        { title: 'Model', field: 'model'},
        { title: 'Year', field: 'vehicle_year'},
        { title: 'Color', field: 'color'},
        { title: 'Plate', field: 'plate'},
        { title: 'Customer ID', field: 'customer_id'}
      ]

    const [status, setStatus] = useState(null);
    const[VIN, setVIN] = useState('');
    const[model, setModel] = useState('');
    const[vehicle_year, setYear] = useState('');
    const[color, setColor] = useState('');
    const[plate, setPlate] = useState('');
    const[customer_id, setID] = useState('');

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/online/harperdb/vehicle';

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
          VIN: VIN,
          model: model,
          vehicle_year: vehicle_year,
          color: color,
          plate: plate,
          customer_id: customer_id
        }
        axios.put('http://127.0.0.1:5000/online/harperdb/vehicle/update-vehicle', data)
          .then(res => {
            setData(res.data);
            setVIN('');
            setModel('');
            setYear('');
            setColor('');
            setPlate('');
            setID('');
            setLoading(false);
          }).catch(err => {
            setLoading(false);
            setIsError(true);
          });
        }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.VIN === undefined){
            errorList.push("Please enter VIN: ")
        }
        if(newData.model === undefined){
            errorList.push("Please enter Model")
        }
        if(newData.vehicle_year === undefined){
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

    const handleRowDelete = (oldData, resolve) =>{
        const url = 'http://127.0.0.1:5000/online/harperdb/vehicle/delete-vehicle/' + oldData.VIN;
        axios.delete(url)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.VIN;
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
        if(newData.VIN === undefined){
            errorList.push("Please enter a VIN: ")
        }
        if(newData.model === undefined){
            errorList.push("Please enter Model")
        }
        if(newData.vehicle_year === undefined){
            errorList.push("Please enter a Year")
        }
        if(newData.color === undefined){
            errorList.push("Please enter a Color")
        }
        if(newData.plate === undefined){
            errorList.push("Please enter a Plate ID")
        }
        if(newData.customer_id === undefined){
            errorList.push("Please enter a Customer ID")
        }
        if(errorList.length < 1){
            axios.put("http://127.0.0.1:5000/online/harperdb/vehicle/update-vehicle", newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.VIN;
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
                    <h1>Vehicles</h1>
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
                                      }),
                                  onRowDelete: oldData =>
                                      new Promise((resolve) => {
                                          handleRowDelete(oldData, resolve)
                                    }),
                              }}
                          />
                      </main>
                      <section>

                        <Suspense fallback={<div>Loading...</div>}>
                          <CarType />
                        </Suspense>
                      </section>
                      
                      <section>

                        <Suspense fallback={<div>Loading...</div>}>
                          <CarRepair />
                        </Suspense>
                      </section>
  
          </div>
        </Fragment>
      );

    
}

export default Vehicles;

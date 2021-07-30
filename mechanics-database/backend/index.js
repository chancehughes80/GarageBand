const express = require('express');
const cors = require('cors');
const knex = require('knex');
const axios = require('axios');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// //POST: Create employees and add them to the database
// app.post('/add-employee', (req, res) => {
//     const { employee_id, employee_name, employee_password, job_title} = req.body;
//     db('Employee')
//         .insert({
//             employee_id: employee_id,
//             employee_name: employee_name,
//             employee_password: employee_password,
//             job_title: job_title,
//         })
//         .then(() => {
//             console.log('Employee Added');
//             return res.json({ msg: 'Employee Added' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// //GET: Read all employees
// app.get('/', (req, res) => {
//     db.select('*')
//         .from('employee')
//         .then((data) => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // PUT: Update employee by employee_id from the database
// app.put('/update-employee', (req, res) => {
//     db('employee')
//         .where('employee_id', '=', 1)
//         .update({ employee_name: 'Divia Joseph' })
//         .then(() => {
//             console.log('Employee Name Updated');
//             return res.json({ msg: 'Employee Name Updated' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // DELETE: Delete movie by movieId from the database
// app.delete('/delete-employee', (req, res) => {
//     const employeeID = req.body;
//     const employeeIdToDelete = String(employeeId.employee_id);
//     console.log(employeeIdToDelete);
//     db('employee')
//         .where('employee_id', '=', employeeIdToDelete)
//         .del()
//         .then(() => {
//             console.log('Employee Deleted');
//             return res.json({ msg: 'Employee Deleted' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// Vehicle CRUD -------------------------------------------------------------------------------------------------------------------------

// //POST: Create vehicles and add them to the database
// app.post('/add-vehicle', (req, res) => {
//     const { VIN, plate, vehicle_year, color, customer_id, model} = req.body;
//     db('Vehicle')
//         .insert({
//             VIN: VIN,
//             plate: plate,
//             vehicle_year: vehicle_year,
//             color: color,
//             customer_id: customer_id,
//             model: model,
//         })
//         .then(() => {
//             console.log('Vehicle Added');
//             return res.json({ msg: 'Vehicle Added' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// //GET: Read all vehicles
// app.get('/', (req, res) => {
//     db.select('*')
//         .from('Vehicle')
//         .then((data) => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // PUT: Update Vehicle by VIN from the database
// app.put('/update-vehicle_VIN', (req, res) => {
//     db('Vehicle')
//         .where('VIN', '=', 1)
//         .update({ VIN: 'JF1CX353XNH100392' })
//         .then(() => {
//             console.log('VIN Updated');
//             return res.json({ msg: 'VIN Updated' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // DELETE: Delete vehicle by VIN from the database
// app.delete('/delete-vehicle', (req, res) => {
//     const VIN = req.body;
//     const VINToDelete = String(VIN.VIN);
//     console.log(VINToDelete);
//     db('Vehicle')
//         .where('VIN', '=', VINToDelete)
//         .del()
//         .then(() => {
//             console.log('Vehicle Deleted');
//             return res.json({ msg: 'Vehicle Deleted' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// VehicleType CRUD

// //POST: Create vehicles and add them to the database
// app.post('/add-vehicle_type', (req, res) => {
//     const { model, make} = req.body;
//     db('VehicleType')
//         .insert({
//             model: model,
//             make: make,
//         })
//         .then(() => {
//             console.log('Vehicle Type Added');
//             return res.json({ msg: 'Vehicle Type Added' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// //GET: Read all vehicle types
// app.get('/', (req, res) => {
//     db.select('*')
//         .from('VehicleType')
//         .then((data) => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // PUT: Update VehicleType by model from the database
// app.put('/update-vehicle_type', (req, res) => {
//     db('VehicleType')
//         .where('model', '=', 1)
//         .update({ model: 'sentra' })
//         .then(() => {
//             console.log('model Updated');
//             return res.json({ msg: 'model Updated' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // DELETE: Delete vehicle type by model from the database
// app.delete('/delete-vehicle_type', (req, res) => {
//     const model = req.body;
//     const modelToDelete = String(model.model);
//     console.log(modelToDelete);
//     db('VehicleType')
//         .where('model', '=', modelToDelete)
//         .del()
//         .then(() => {
//             console.log('Vehicle Type Deleted');
//             return res.json({ msg: 'Vehicle Type Deleted' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// VehicleRepair CRUD

// //POST: Create vehicles and add them to the database
// app.post('/add-vehicle_repair', (req, res) => {
//     const { VIN, repair_id, status, actual_time_for_repair} = req.body;
//     db('VehicleRepair')
//         .insert({
//             VIN: VIN,
//             repair_id: repair_id,
//             status: status,
//             actual_time_for_repair: actual_time_for_repair,
//         })
//         .then(() => {
//             console.log('Vehicle Repair Added');
//             return res.json({ msg: 'Vehicle  RepairAdded' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// //GET: Read all vehicle repairs
// app.get('/', (req, res) => {
//     db.select('*')
//         .from('VehicleRepair')
//         .then((data) => {
//             console.log(data);
//             res.json(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // PUT: Update VehicleRepair by VIN from the database
// app.put('/update-vehicle_repair', (req, res) => {
//     db('VehicleRepair')
//         .where('VIN', '=', 1)
//         .update({ VIN: 'JF1CX353XNH100392' })
//         .then(() => {
//             console.log('VIN Updated');
//             return res.json({ msg: 'VIN Updated' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // DELETE: Delete vehicle repair by VIN from the database
// app.delete('/delete-vehicle_repair', (req, res) => {
//     const VIN = req.body;
//     const VINToDelete = String(VIN.VIN);
//     console.log(VINToDelete);
//     db('VehicleRepair')
//         .where('VIN', '=', VINToDelete)
//         .del()
//         .then(() => {
//             console.log('Vehicle Repair Deleted');
//             return res.json({ msg: 'Vehicle Repair Deleted' });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });


// HarperDB Database routes

// CRUD for Vehicle Table --------------------------------------------------------------------------------------------------------

// GET: Fetch all vehicles from the database
app.get('/online/harperdb/vehicle', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Vehicle' };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// POST: Create vehicles and add them to the database
app.post('/online/harperdb/add-vehicle', (req, res) => {
    const { VIN, plate, vehicle_year, color, customer_id, model } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Vehicle',
        records: [
            {
            VIN: VIN,
            plate: plate,
            vehicle_year: vehicle_year,
            color: color,
            customer_id: customer_id,
            model: model,
            },
        ],
    };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// DELETE: Delete vehicle by VIN from the database
app.delete('/online/harperdb/delete-vehicle', (req, res) => {
    const VIN = req.body.VIN;
    console.log(VIN);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Vehicle WHERE VIN = ${VIN}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Deleted' });
            console.log('Vehicle Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

// PUT: Update vehicle by VIN from the database
app.put('/online/harperdb/update-vehicle', (req, res) => {
    const VIN = req.body.VIN;
    console.log(VIN);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Vehicle SET model = 'Sentra' WHERE VIN = ${VIN}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Updated' });
            console.log('Vehicle Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});

// CRUD for VehicleType Table -----------------------------------------------------------------------------------------------------------

// GET: Fetch all vehicle types from the database
app.get('/online/harperdb/vehicle_type', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.VehicleType' };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// POST: Create vehicle types and add them to the database
app.post('/online/harperdb/add-vehicle_type', (req, res) => {
    const { model, make } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'VehicleType',
        records: [
            {
            model: model,
            make: make,
            },
        ],
    };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// DELETE: Delete vehicle type by model from the database
app.delete('/online/harperdb/delete-vehicle_type', (req, res) => {
    const model = req.body.model;
    console.log(model);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.VehicleType WHERE model = ${model}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Type Deleted' });
            console.log('Vehicle Type Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

// PUT: Update vehicle type by model from the database
app.put('/online/harperdb/update-vehicle_type', (req, res) => {
    const model = req.body.model;
    console.log(model);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.VehicleType SET make = 'Nissan' WHERE model = ${model}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Type Updated' });
            console.log('Vehicle Type Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});

// CRUD for Vehicle Repair --------------------------------------------------------------------------------------------------------------

// GET: Fetch all vehicle repairs from the database
app.get('/online/harperdb/vehicle_repair', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.VehicleRepair' };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// POST: Create vehicle repairs and add them to the database
app.post('/online/harperdb/add-vehicle_repair', (req, res) => {
    const { VIN, repair_id } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'VehicleRepair',
        records: [
            {
            VIN: VIN,
            repair_id: repair_id,
            },
        ],
    };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// DELETE: Delete vehicle repair by VIN from the database
app.delete('/online/harperdb/delete-vehicle_repair', (req, res) => {
    const VIN = req.body.VIN;
    console.log(VIN);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.VehicleRepair WHERE VIN = ${VIN}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Repair Deleted' });
            console.log('Vehicle Repair Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

// PUT: Update vehicle repair by VIN from the database
app.put('/online/harperdb/update-vehicle_repair', (req, res) => {
    const model = req.body.model;
    console.log(model);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.VehicleRepair SET repair_id = '123456789A' WHERE VIN = ${modVINel}` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            res.send({ msg: 'Vehicle Repair Updated' });
            console.log('Vehicle Repair Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

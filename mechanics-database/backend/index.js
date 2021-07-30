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


/*|~~~~~~~~~~~~~~~~~~~~~~                                       ~~~~~~~~~~~~~~~~~~~~~~~|
  |                      Manipulating and pulling from Harper DB                       |
  |~~~~~~~~~~~~~~~~~~~~~~                                       ~~~~~~~~~~~~~~~~~~~~~~~|*/



//~~~~~~~~~~~~~~~~~~~~~Employee Table CRUD~~~~~~~~~~~~~~~~~~~~~

//GET
app.get('/online/harperdb/employee', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Employee' };

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

//POST: Create employees and add them to the database
app.post('/online/harperdb/employee/add-employee', (req, res) => {
    const { employee_id, employee_name, employee_password, job_title} = req.body;
    db('employee')
        .insert({
            employee_id: employee_id,
            employee_name: employee_name,
            employee_password: employee_password,
            job_title: job_title,
        })
        .then(() => {
            console.log('Employee Added');
            return res.json({ msg: 'Employee Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT: Update employee by employee_id from the database
app.put('/online/harperdb/employee/update-employee', (req, res) => {
    db('employee')
        .where('employee_id', '=', 1)
        .update({ employee_name: 'Divia Joseph' })
        .then(() => {
            console.log('Employee Name Updated');
            return res.json({ msg: 'Employee Name Updated' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// DELETE: Delete movie by movieId from the database
app.delete('/online/harperdb/employee/delete-employee', (req, res) => {
    const employeeID = req.body;
    const employeeIdToDelete = String(employeeId.employee_id);
    console.log(employeeIdToDelete);
    db('employee')
        .where('employee_id', '=', employeeIdToDelete)
        .del()
        .then(() => {
            console.log('Employee Deleted');
            return res.json({ msg: 'Employee Deleted' });
        })
        .catch((err) => {
            console.log(err);
        });
});

//~~~~~~~~~~~~~~~~~~~~~End of Employee Table CRUD~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~Parts Table CRUD~~~~~~~~~~~~~~~~~~~~~

// GET All values from Parts table
app.get('/online/harperdb/parts', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Parts' };

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

// POST: Add new part to table
app.post('/online/harperdb/parts/add-part', (req, res) => {
    const { partid,count,pr,mod} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Parts',
        records: [
            {
                part_id: partid,
                part_count: count,
                price: pr,
                model: mod,
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


//PUT: Update a part
app.put('/online/harperdb/parts/update-part', (req, res) => {
    const {partid,pr,cou,mod} = req.body;
    console.log(req.body);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Parts SET part_count = ${cou}, price = ${pr}, model = ${mod} WHERE part_id = ${partid}` };

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
            res.send({ msg: 'Part Updated' });
            console.log('Part Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});


//DELETE
app.delete('/online/harperdb/parts/delete-part', (req, res) => {
    const partid = req.body.partid;
    console.log(partid);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Parts WHERE part_id = ${partid}` };

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
            res.send({ msg: 'Part Deleted' });
            console.log('Part Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

//~~~~~~~~~~~~~~~~~~~~~End of Parts Table CRUD~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~PartsType Table CRUD~~~~~~~~~~~~~~~~~~~~~

// GET
app.get('/online/harperdb/partstype', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.PartsType' };

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

// POST
app.post('/online/harperdb/partstype/add-type', (req, res) => {
    const {mod,mk} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'PartsType',
        records: [
            {
                model:mod,
                make:mk
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


//PUT
app.put('/online/harperdb/partstype/update-type', (req, res) => {
    const {mod,mk} = req.body;
    console.log(req.body);

    const data = {operation: 'sql', sql: `UPDATE Mechanics.PartsType SET make = ${mk} WHERE model = ${mod}`};

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
            res.send({ msg: 'Part Updated' });
            console.log('Part Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});

//DELETE
app.delete('/online/harperdb/partstype/delete-type', (req, res) => {
    const mod = req.body.mod;
    console.log(mod);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.PartsType WHERE model = ${mod}` };

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
            res.send({ msg: 'Part type Deleted' });
            console.log('Part type Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});


//~~~~~~~~~~~~~~~~~~~~~End of PartsType Table CRUD~~~~~~~~~~~~~~~~~~~~~
/*
// Start of CRUD for Vehicle Table --------------------------------------------------------------------------------------------------------

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
app.get('/online/harperdb/vehicle-type', (req, res) => {
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
app.delete('/online/harperdb/delete-vehicle-type', (req, res) => {
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
app.put('/online/harperdb/update-vehicle-type', (req, res) => {
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
app.get('/online/harperdb/vehicle-repair', (req, res) => {
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
app.post('/online/harperdb/add-vehicle-repair', (req, res) => {
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
app.delete('/online/harperdb/delete-vehicle-repair', (req, res) => {
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
app.put('/online/harperdb/update-vehicle-repair', (req, res) => {
    const VIN = req.body.VIN;
    console.log(VIN);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.VehicleRepair SET repair_id = '123456789A' WHERE VIN = ${VIN}` };

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
*/
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

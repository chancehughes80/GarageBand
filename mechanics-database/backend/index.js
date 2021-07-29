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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

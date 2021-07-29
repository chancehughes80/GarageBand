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

//POST: Create employees and add them to the database
app.post('/add-employee', (req, res) => {
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

//GET: Read all employees
app.get('/', (req, res) => {
    db.select('*')
        .from('employee')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT: Update employee by employee_id from the database
app.put('/update-employee', (req, res) => {
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
app.delete('/delete-employee', (req, res) => {
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

// HarperDB Database routes

app.get('/online/harperdb', (req, res) => {
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

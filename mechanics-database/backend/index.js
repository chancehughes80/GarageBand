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

// HarperDB Database routes

// POST: Create employee and add them to the database
app.post('/add-employee', (req, res) => {
    const { employee_id, employee_name, employee_password, job_title } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Employee',
        records: [
            {
              employee_id: employee_id,
              employee_name: employee_name,
              employee_password: employee_password,
              job_title: job_title
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
            console.log('Employee Added');
            res.json(data);
            //return res.redirect('http://localhost:3000')
        })
        .catch((error) => {
            console.log(error);
        });
});

//GET: Read all employees from the database
app.get('/', (req, res) => {
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

//GET: Read an employee by employee_ID from the DATABASE
app.get('/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id;
    console.log(employee_id);

    const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Employee WHERE id = ${employee_id}` };

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

// PUT: Update employee by employee_id from the database
app.put('/update-employee', (req, res) => {
    const employee_id = req.body.employee_id;
    console.log(employee_id);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Employee SET employee_name = 'Nick Oberg' WHERE id = ${employee_id}` };

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
            res.send({ msg: 'Employee Updated' });
            console.log('Employee Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});

//DELETE: Delete employee by employee_id from database
app.delete('/delete-employee', (req, res) => {
    const employee_id = req.body.employee_id;
    console.log(employee_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Employee WHERE id = ${employee_id}` };

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
            res.send({ msg: 'Employee Deleted' });
            console.log('Employee Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

// POST: Create salary and add to the database
app.post('/add-salary', (req, res) => {
    const { job_title, wage } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Salary',
        records: [
            {
              job_title: job_title,
              wage: wage,
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
            //return res.redirect('http://localhost:3000')
        })
        .catch((error) => {
            console.log(error);
        });
});

//GET: Read all salaries from the database
app.get('/', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Salary' };

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

//GET: Read an salary by job_title from the DATABASE
app.get('/:job_title', (req, res) => {
    const job_title = req.params.job_title;
    console.log(job_title);

    const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Salary WHERE id = ${job_title}` };

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

// PUT: Update salary by job_title from the database
app.put('/update-salary', (req, res) => {
    const job_title = req.body.job_title;
    console.log(job_title);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Salary SET wage = '700000' WHERE job_title = ${job_title}` };

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
            res.send({ msg: 'Salary Updated' });
            console.log('Salary Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});

//DELETE: Delete Salary by job_title from database
app.delete('/delete-salary', (req, res) => {
    const job_title = req.body.job_title;
    console.log(job_title);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Salary WHERE job_title = ${job_title}` };

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
            res.send({ msg: 'Salary Deleted' });
            console.log('Salary Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

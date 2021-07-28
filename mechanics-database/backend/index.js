const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
const axios = require('axios');

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

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all parts from the database
app.get('/', (req, res) => {
    db.select('*')
        .from('parts')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});
/*
// POST: Add parts to table
app.post('/add-part', (req, res) => {
    const { partid,count,pr,mod} = req.body;
    db('parts')
        .insert({
            part_id: partid,
            part_count: count,
            price: pr,
            model: mod,
        })
        .then(() => {
            console.log('Part added');
            return res.json({ msg: 'Part added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// DELETE: Delete part by part id from the database
app.delete('/delete-part', (req, res) => {
    const partid = req.body;
    const partidDelete = Number(partid.partid);
    console.log(partidDelete);
    db('parts')
        .where('part_id', '=', partidDelete)
        .del()
        .then(() => {
            console.log('Part Removed');
            return res.json({ msg: 'Part Removed' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT: Update part by part id from the database
app.put('/update-part', (req, res) => {
    db('parts')
        .where('part_id', '=', 341)
        .update({ part_count: '30' })
        .then(() => {
            console.log('Part Updated');
            return res.json({ msg: 'Part Updated' });
        })
        .catch((err) => {
            console.log(err);
        });
});
*/
// GET
app.get('/online/harperdb', (req, res) => {
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

// POST
app.post('/online/harperdb/add-part', (req, res) => {
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

//DELETE
app.delete('/online/harperdb/delete-part', (req, res) => {
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

//PUT
app.put('/online/harperdb/update-part', (req, res) => {
    const partid = req.body.partid;
    console.log(partid);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Parts SET part_count = '40' WHERE part_id = ${partid}` };

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



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));
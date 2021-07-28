const express = require('express');
const cors = require('cors');
const knex = require('knex');
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));
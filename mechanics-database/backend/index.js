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
app.use(cors());


/*|~~~~~~~~~~~~~~~~~~~~~~                                       ~~~~~~~~~~~~~~~~~~~~~~~|
  |                      Manipulating and pulling from Harper DB                       |
  |~~~~~~~~~~~~~~~~~~~~~~                                       ~~~~~~~~~~~~~~~~~~~~~~~|*/

  app.use('/online/harperdb/employee/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id;
    console.log(employee_id);

    const data = { operation: 'sql', sql: `SELECT employee_password FROM Mechanics.Employee WHERE employee_id = "${employee_id}"` };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data : data
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

//~~~~~~~~~~~~~~~~~~~~~~Customer Table CRUD~~~~~~~~~~~~~~~~~~~~~~

//get all the customers and read
app.get('/online/harperdb/customer', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Customer' };
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
            return res.redirect('http://localhost:5000/Customers');
        })
        .catch((error) => {
            console.log(error);
        });
});

//GET get a customer password by customer_id
app.use('/online/harperdb/customer/:customer_id', (req, res) => {
  const customer_id = req.params.customer_id;
  console.log(customer_id);

  const data = { operation: 'sql', sql: `SELECT customer_password FROM Mechanics.Customer WHERE customer_id = "${customer_id}"` };

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

//GET get a customer by customer_id
app.get('/online/harperdb/:customer_id', (req, res) => {
  const customer_id = req.params.customer_id;
  console.log(customer_id);

  const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Customer WHERE customer_id = "${customer_id}"` };

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
            return res.redirect('http://localhost:5000/Customers');
        })
        .catch((error) => {
            console.log(error);
        });
});

//create and insert new customers
app.post('/online/customer/add-customer', (req, res) => {
    const { customer_id, customer_name, billing_address, email_address, phone_number, customer_password} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Customer',
        records: [
            {
                customer_id: customer_id,
                customer_name: customer_name,
                billing_address: billing_address,
                email_address: email_address,
                phone_number: phone_number,
                customer_password: customer_password,
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
            console.log('Customer Added');
            return res.redirect('http://localhost:3000/Customer')
        })
        .catch((error) => {
            console.log(error);
        });
});


//update customer
app.put('/online/customer/update-customer', (req, res) => {
    const { customer_id, customer_name, billing_address, email_address, phone_number, customer_password} = req.body;
    console.log(req.body);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Customer SET customer_name = "${customer_name}", customer_password = "${customer_password}",
    billing_address = "${billing_address}", email_address = "${email_address}", phone_number = "${phone_number}"
    WHERE customer_id = "${customer_id}"` };

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
            res.send({ msg: 'Customer Updated' });
            console.log('Customer Updated');
            return res.redirect('http://localhost:3000/Customers');
        })
        .catch((error) => {
            console.log(error);
        });
});


//delete customer
app.delete('/online/customer/delete-customer/:customer_id', (req, res) => {
    const customer_id = req.params.customer_id;
    console.log(customer_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Customer WHERE customer_id = "${customer_id}"` };

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
            res.send({ msg: 'Customer Deleted' });
            console.log('Customer Deleted');
            return res.redirect('http://localhost:3000/Customers');
        })
        .catch((error) => {
            console.log(error);
        });
});


//~~~~~~~~~~~~~~~~~~~~~~End of Customer Table CRUD~~~~~~~~~~~~~~~~~~~~~~



//~~~~~~~~~~~~~~~~~~~~~Employee Table CRUD~~~~~~~~~~~~~~~~~~~~~


//GET: get all employees
app.get('/online/employee/', (req, res) => {
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
            return res.redirect('http://localhost:3000/Employees');
        })
        .catch((error) => {
            console.log(error);
        });
});



//POST: Create employees and add them to the database
app.post('/online/harperdb/add-employee', (req, res) => {
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
            job_title: job_title,
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
          return res.redirect('http://localhost:3000/Employees')
      })
      .catch((error) => {
          console.log(error);
      });
});


// PUT: Update employee by employee_id from the database
app.put('/online/harperdb/update-employee', (req, res) => {
  const {employee_id, employee_name, job_title, employee_password} = req.body;
  console.log(req.body);

  const data = { operation: 'sql', sql: `UPDATE Mechanics.Employee SET employee_name = "${employee_name}", job_title = "${job_title}", employee_password = "${employee_password}" WHERE employee_id = "${employee_id}"` };

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
          return res.redirect('http://localhost:3000/Employees');
      })
      .catch((error) => {
          console.log(error);
      });
});


// DELETE: Delete employee by employee_id from the database
app.delete('/online/harperdb/delete-employee/:employee_id', (req, res) => {
    const employee_id = req.params.employee_id;
    console.log(employee_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Employee WHERE employee_id = "${employee_id}"` };

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
            console.log('Employee Deleted');
            return res.redirect('http://localhost:3000/Employees');
        })
        .catch((error) => {
            console.log(error);
        });
});


//~~~~~~~~~~~~~~~~~~~~~End of Employee Table CRUD~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~Parts Table CRUD~~~~~~~~~~~~~~~~~~~~~


// GET All values from Parts table
app.get('/online/parts', (req, res) => {
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


app.get('/online/parts/:part_id', (req, res) => {
  const part_id = req.params.part_id;
  console.log(part_id);

  const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Parts WHERE part_id = "${part_id}"` };

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
            return res.redirect('http://localhost:3000/Parts');
        })
        .catch((error) => {
            console.log(error);
        });
});



// POST: Add new part to table
app.post('/online/parts/add-part', (req, res) => {
    const { part_id,part_count,price,model} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Parts',
        records: [
            {
                part_id: part_id,
                part_count: part_count,
                price: price,
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
          console.log('Part Added');
          return res.redirect('http://localhost:3000/Parts')
      })
      .catch((error) => {
          console.log(error);
      });
});


//PUT: Update a part
app.put('/online/parts/update-part', (req, res) => {
    const {part_id,price,part_count,model} = req.body;
    console.log(req.body);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.Parts SET part_count = "${part_count}", price = "${price}", model = "${model}" WHERE part_id = "${part_id}"` };

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
            return res.redirect('http://localhost:3000/Parts');
        })
        .catch((error) => {
            console.log(error);
        });
});


//DELETE
app.delete('/online/parts/delete-part/:part_id', (req, res) => {
    const part_id = req.params.part_id;
    console.log(part_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Parts WHERE part_id = "${part_id}"` };

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
            console.log('Part Deleted');
            return res.redirect('http://localhost:3000/Parts');
        })
        .catch((error) => {
            console.log(error);
        });
});

//~~~~~~~~~~~~~~~~~~~~~End of Parts Table CRUD~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~PartsType Table CRUD~~~~~~~~~~~~~~~~~~~~~

// GET
app.get('/online/partstype', (req, res) => {
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
app.post('/online/partstype/add-type', (req, res) => {
    const {model,make} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'PartsType',
        records: [
            {
                model:model,
                make:make
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
app.put('/online/partstype/update-type', (req, res) => {
    const {model, make} = req.body;
    console.log(req.body);

    const data = {operation: 'sql', sql: `UPDATE Mechanics.PartsType SET make = "${make}" WHERE model = "${model}"`};

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
app.delete('/online/partstype/delete-type/:model', (req, res) => {
    const model = req.params.model;
    console.log(model);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.PartsType WHERE model = "${model}"` };

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


//~~~~~~~~~~~~~~~~~~~~~Repairs Table CRUD~~~~~~~~~~~~~~~~~~~~~

// GET All values from Repair table
app.get('/online/repair', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.Repair' };

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

// POST: Add new Repair
app.post('/online/repair/add-repair', (req, res) => {
  const { repair_id, repair_description, estimated_time_for_repair, repair_cost} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'Repair',
        records: [
            {
                repair_id: repair_id,
                repair_description: repair_description,
                estimated_time_for_repair: estimated_time_for_repair,
                repair_cost: repair_cost,
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



//PUT: Update Repair
app.put('/online/repair/update-repair', (req, res) => {
    const { repair_id, repair_description, estimated_time_for_repair, repair_cost} = req.body;
    console.log(req.body);

console.log('Repair Updated');
    const data = { operation: 'sql', sql: `UPDATE Mechanics.Repair SET repair_id= "${repair_id}", repair_description = "${repair_description}", estimated_time_for_repair= "${estimated_time_for_repair}", repair_cost = "${repair_cost}" WHERE repair_id = "${repair_id}"` };

console.log(data);

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
            res.send({ msg: 'Repair Updated' });
            console.log('Repair Updated');
       })
        .catch((error) => {
            console.log(error);
       });
});


//DELETE Repair
app.delete('/online/repair/delete-repair/:repair_id', (req, res) => {
    const repair_id = req.params.repair_id;
    console.log(repair_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Repair WHERE repair_id = "${repair_id}"` };

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
            res.send({ msg: 'Repair Deleted' });
            console.log('Repair Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});

//~~~~~~~~~~~~~~~~~~~~~End of Repair Table CRUD~~~~~~~~~~~~~~~~~~~~~



//~~~~~~~~~~~~~~~~~~~~~RepairParts Table CRUD~~~~~~~~~~~~~~~~~~~~~
 // GET All values from RepairParts table
app.get('/online/repairparts', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.RepairParts' };

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

// POST: Add new PartsRepair
app.post('/online/repairparts/add-repairparts', (req, res) => {
    const { serial_id, repair_id, part_id} = req.body;
    console.log(req.body);
    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'RepairParts',
        records: [
            {
                serial_id: serial_id,
                repair_id: repair_id,
                part_id: part_id,
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


//PUT: Update PartsRepair
app.put('/online/repairparts/update-repairparts', (req, res) => {
    const {serial_id, part_id, repair_id} = req.body;
    console.log(req.body);
    console.log('To be Updated');
    const data = { operation: 'sql', sql: `UPDATE Mechanics.RepairParts SET part_id="${part_id}", repair_id = "${repair_id}" WHERE serial_id = "${serial_id}"` };

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
            res.send({ msg: 'RepairParts Updated' });
            console.log('RepairParts log Updated');
        })
        .catch((error) => {
            console.log(error);
        });
});


//DELETE PartsRepair
app.delete('/online/repairparts/delete-repairparts/:serial_id', (req, res) => {
    const serial_id = req.params.serial_id;
    console.log('Delete PartsRepair');
    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.RepairParts WHERE serial_id = "${serial_id}"` };

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
            res.send({ msg: 'RepairParts Deleted' });
            console.log('RepairParts Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
});



//~~~~~~~~~~~~~~~~~~~~~End of PartsRepair Table CRUD~~~~~~~~~~~~~~~~~~~~~


// Start of CRUD for Vehicle Table --------------------------------------------------------------------------------------------------------

// GET: Fetch all vehicles from the database
app.get('/online/vehicle', (req, res) => {
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

// GET: Fetch all vehicles from the database
app.get('/online/harperdb/vehicle/:customer_id', (req, res) => {
  const customer_id = req.params.customer_id;
  console.log(customer_id);
  const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Vehicle WHERE customer_id = ${customer_id}` };
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
app.post('/online/vehicle/add-vehicle', (req, res) => {
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


// PUT: Update vehicle by VIN from the database
app.put('/online/vehicle/update-vehicle', (req, res) => {
    const {VIN, vehicle_year, plate, color, customer_id, model} = req.body;
    console.log(req.body);
    const data = { operation: 'sql', sql: `UPDATE Mechanics.Vehicle SET vehicle_year = "${vehicle_year}", plate = "${plate}", color = "${color}", customer_id = "${customer_id}", model = "${model}" WHERE VIN = "${VIN}"` };
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


// DELETE: Delete vehicle by VIN from the database
app.delete('/online/vehicle/delete-vehicle/:VIN', (req, res) => {
    const VIN = req.params.VIN;
    console.log(VIN);
    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Vehicle WHERE VIN = "${VIN}"` };
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



// CRUD for VehicleType Table -----------------------------------------------------------------------------------------------------------


// GET: Fetch all vehicle types from the database
app.get('/online/vehicle-type', (req, res) => {
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
app.post('/online/vehicle-type/add-vehicle_type', (req, res) => {
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


// PUT: Update vehicle type by model from the database
app.put('/online/vehicle-type/update-vehicle-type', (req, res) => {
    const {model, make} = req.body;
    console.log('updating vehicle-type');
    console.log(req.body);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.VehicleType SET make = "${make}" WHERE model = "${model}"` };

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


// DELETE: Delete vehicle type by model from the database
app.delete('/online/vehicle-type/delete-vehicle-type/:model', (req, res) => {
    const model = req.params.model;
    console.log(model);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.VehicleType WHERE model = "${model}"` };

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


// CRUD for Vehicle Repair --------------------------------------------------------------------------------------------------------------

// GET: Fetch all vehicle repairs from the database
app.get('/online/repair-vehicle', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.RepairVehicle' };

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

// GET: Fetch all vehicle repairs by customer_id from the database
app.get('/online/harperdb/repair-vehicle/:customer_id', (req, res) => {
    const customer_id = req.params.customer_id;
    console.log(customer_id);
    const data = { operation: 'sql', sql: `SELECT rv.VIN, rv.repair_status, rv.repair_id, rv.actual_time FROM Mechanics.RepairVehicle AS rv INNER JOIN Mechanics.Vehicle AS v ON rv.VIN = v.VIN WHERE v.customer_id = "${customer_id} "` };

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
app.post('/online/repair-vehicle/add-repair-vehicle', (req, res) => {
    const { VIN, repair_id, repair_status, actual_time } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'Mechanics',
        table: 'RepairVehicle',
        records: [
            {
            VIN: VIN,
            repair_id: repair_id,
            repair_status: repair_status,
            actual_time: actual_time,
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


// PUT: Update vehicle repair by VIN from the database
app.put('/online/repair-vehicle/update-repair-vehicle', (req, res) => {

    const {repair_id, VIN, repair_status, actual_time} = req.body;
    console.log(req.body);

    const data = { operation: 'sql', sql: `UPDATE Mechanics.RepairVehicle SET VIN = "${VIN}", repair_status = "${repair_status}", actual_time = "${actual_time}" WHERE repair_id = "${repair_id}"` };

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


// DELETE: Delete vehicle repair by VIN from the database
app.delete('/online/repair-vehicle/delete-repair-vehicle/:repair_id', (req, res) => {
    const repair_id = req.params.repair_id;
    console.log(repair_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.RepairVehicle WHERE repair_id = "${repair_id}"` };

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
//~~~~~~~~~~~~~~~~~~~~~End of VehicleRepair Table CRUD~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~Salary Table CRUD~~~~~~~~~~~~~~~~~~~~~


//GET: get all salaries
app.get('/online/salary/', (req, res) => {
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
            return res.redirect('http://localhost:5000/Salary');
        })
        .catch((error) => {
            console.log(error);
        });
});

//GET get an salary by job_title
app.get('/online/harperdb/salary/:job_title', (req, res) => {
  const job_title = req.params.job_title;
  console.log(job_title);

  const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.Salary WHERE job_title = "${job_title}"` };

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
            return res.redirect('http://localhost:5000/Salary');
        })
        .catch((error) => {
            console.log(error);
        });
});


//POST: Create salaries and add them to the database
app.post('/online/harperdb/add-salary', (req, res) => {
  const { job_title, wage } = req.body;
  console.log(req.body);

  const data = {
      operation: 'insert',
      schema: 'Mechanics',
      table: 'Salary',
      records: [
          {
            job_title: job_title,
            wage: wage
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
          console.log('Salary Added');
          return res.redirect('http://localhost:3000/Salary')
      })
      .catch((error) => {
          console.log(error);
      });
});


// PUT: Update salary by job_title from the database
app.put('/online/harperdb/update-salary', (req, res) => {

  const {job_title, wage} = req.body;
  console.log(req.body);

  const data = { operation: 'sql', sql: `UPDATE Mechanics.Salary SET wage = "${wage}" WHERE job_title = "${job_title}"` };

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
          return res.redirect('http://localhost:3000/Salary');
      })
      .catch((error) => {
          console.log(error);
      });
});


// DELETE: Delete salary by job_title from the database
app.delete('/online/harperdb/delete-salary/:job_title', (req, res) => {
    const job_title = req.params.job_title;
    console.log(job_title);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.Salary WHERE job_title = "${job_title}"` };

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
            console.log('Salary Deleted');
            return res.redirect('http://localhost:3000/Salary');
        })
        .catch((error) => {
            console.log(error);
        });
});


//~~~~~~~~~~~~~~~~~~~~~End of Salary Table CRUD~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~EmployeeRepair Table CRUD~~~~~~~~~~~~~~~~~~~~~


//GET: get all employees
app.get('/online/employeerepair/', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM Mechanics.EmployeeRepair' };
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
            return res.redirect('http://localhost:5000/Repairs');
        })
        .catch((error) => {
            console.log(error);
        });
});

//GET get an employee by employee_id
app.get('/online/employeerepair/:serial_id', (req, res) => {
  const serial_id = req.params.serial_id;
  console.log(serial_id);

  const data = { operation: 'sql', sql: `SELECT * FROM Mechanics.EmployeeRepair WHERE serial_id = "${serial_id}"` };

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
            return res.redirect('http://localhost:5000/Repairs');
        })
        .catch((error) => {
            console.log(error);
        });
});


//POST: Create employees and add them to the database
app.post('/online/employeerepair/add-employeerepair', (req, res) => {
  const { serial_id, employee_id, repair_id } = req.body;
  console.log(req.body);

  const data = {
      operation: 'insert',
      schema: 'Mechanics',
      table: 'EmployeeRepair',
      records: [
          {
            serial_id: serial_id,
            employee_id: employee_id,
            repair_id: repair_id
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
          console.log('EmployeeRepair Added');
          return res.redirect('http://localhost:3000/Repairs')
      })
      .catch((error) => {
          console.log(error);
      });
});


// PUT: Update EmployeeRepair by serial_id from the database
app.put('/online/employeerepair/update-employeerepair', (req, res) => {

  const {serial_id, employee_id, repair_id} = req.body;
  console.log(req.body);

  const data = { operation: 'sql', sql: `UPDATE Mechanics.EmployeeRepair SET employee_id = "${employee_id}", repair_id = "${repair_id}" WHERE serial_id = "${serial_id}"` };

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
          res.send({ msg: 'EmployeeRepair Updated' });
          console.log('EmployeeRepair Updated');
          return res.redirect('http://localhost:3000/Repairs');
      })
      .catch((error) => {
          console.log(error);
      });
});


// DELETE: Delete employeerepair by serial_id from the database
app.delete('/online/employeerepair/delete-employeerepair/:serial_id', (req, res) => {
    const serial_id = req.params.serial_id;
    console.log(serial_id);

    const data = { operation: 'sql', sql: `DELETE FROM Mechanics.EmployeeRepair WHERE serial_id = "${serial_id}"` };

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
            console.log('EmployeeRepair Deleted');
            return res.redirect('http://localhost:3000/Repairs');
        })
        .catch((error) => {
            console.log(error);
        });
});


//~~~~~~~~~~~~~~~~~~~~~End of Employee Table CRUD~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~Validation~~~~~~~~~~~~~~~~~~~~~

//Check if repair_id exists
app.get('/online/validaterepair/:repair_id', (req, res) => {
  const repair_id = req.params.repair_id;
  //console.log(repair_id);
  const data = { operation: 'sql', sql: `SELECT repair_id FROM Mechanics.Repair WHERE repair_id = "${repair_id}"` };
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
            console.log('Return repair_id: '+ data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});
app.use('/online/validateemployee/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id;
  //console.log(employee_id);

  const data = { operation: 'sql', sql: `SELECT employee_id FROM Mechanics.Employee WHERE employee_id = "${employee_id}"` };

  const config = {
      method: 'post',
      url: process.env.HARPERDB_URL,
      headers: {
          Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
          'Content-Type': 'application/json',
      },
      data : data
  };

    axios(config)
        .then((response) => {
            const data = response.data;
            const strdata = JSON.stringify(data);
            console.log(data);
            console.log(strdata);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

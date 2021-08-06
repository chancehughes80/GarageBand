const express = require('express');
const cors = require('cors')
const app = express();
const bpp = express();

app.use(cors());
bpp.use(cors());

app.use('/Login', (req, res) => {
  console.log('Logging in as employee');
  res.send({
    token: 'employeetoken'
  });
});


bpp.use('/Login/customer/:username', (req, res) => {
  const user = req.params.username;
  console.log(user);
  console.log('Logging in as customer');
  res.send({
    token: 'customertoken'+ user
  });
  console.log('customertoken'+user);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/Login'));
bpp.listen(8081, () => console.log('API is running on http://localhost:8081/Login/customer/:username'));

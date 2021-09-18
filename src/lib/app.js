const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('../routes');
var cors = require('cors');
resolve = require('path').resolve;

dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
//Route middleware
app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(resolve('./dist/index.html'));
});
module.exports = app;

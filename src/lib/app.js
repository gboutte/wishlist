const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('../routes');

dotenv.config();

//Middleware
app.use(express.json());

//Route middleware
app.use('/api',router);

module.exports = app;
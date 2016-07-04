'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./Routes/bookRoutes');

let db;

if(process.env.ENV = 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI');
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log('Running on: ' + port);
});

module.exports = app;

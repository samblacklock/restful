'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');

bookRouter.route('/Books')
  .get((req, res) => {

    let query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) res.status(500).send(err);

      res.json(books);
    });
  });

bookRouter.route('/Books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) res.status(500).send(err);

      res.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log('Running on port: ' + port);
});

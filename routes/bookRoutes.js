'use strict'

const express = require('express');
const Book = require('./../models/bookModel');

const routes = () => {
  const bookRouter = express.Router()

  bookRouter.route('/Books')
    .post((req, res) => {
      let book = new Book(req.body);

      book.save();
      res.status(201).send(book);
    })
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
    })
    .put((req, res) => {
      console.log('put detected');
      Book.findById(req.params.bookId, (err, book) => {
        if (err) res.status(500).send(err);

        book.title = req.body.title;
        book.author = req.body.author ;
        book.genre = req.body.genre;
        book.read = req.body.read;

        book.save();
        res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes();

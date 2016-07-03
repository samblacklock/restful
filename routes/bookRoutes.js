'use strict'

const express = require('express');
const Book = require('./../models/bookModel');

const routes = () => {
  const bookRouter = express.Router();

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

  bookRouter.use('/Books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if(err) {
        res.status(500).send(err);
      }
      else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('not found')
      }
    });
  });

  bookRouter.route('/Books/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      req.book.title = req.body.title;
      req.book.author = req.body.author ;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;

      req.book.save((err) => {
        if (err) res.status(500).send(err);
        else res.json(req.book);
      });
      res.json(req.book);
    })
    .patch((req, res) => {
      if(req.body._id) {
        delete req.body._id;
      }

      for(let p in req.body) {
        req.book[p] = req.body[p]
      }

      req.book.save((err) => {
          if (err) res.status(500).send(err);
          else res.json(req.book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Remove');
        }
      });
    });

  return bookRouter;
}

module.exports = routes();

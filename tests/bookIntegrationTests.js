const should = require('should');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const agent = request.agent(app);


describe('Book Crud Test', function() {
  it('should allow a book to be posted and return a read and _id', function(done) {
    let bookPost = {
      'author': 'test author',
      'title': 'test book',
      'genre': 'fiction'
    }

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results) {
        if(err) console.log(err)
        else {
          results.body.read.should.equal(false);
          results.body.should.have.property('_id');
          done(err);
        }
      })
  });

  afterEach(function(done) {
    Book.remove().exec();
    done();
  });
})

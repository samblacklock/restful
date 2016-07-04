const should = require('should');
const sinon = require('sinon');

describe('Book Controller Tests', () => {
  describe('Post tests', () => {
    it('should not allow an empty title on POST', () => {
      let Book = function(book) {
        this.save = () => {}
      };

      let req = {
        body: {
          author: 'Joe Bloggs'
        }
      };

      let res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      let bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});

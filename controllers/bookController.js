const bookController = (Book) => {
  const post = (req, res) => {
    let book = new Book(req.body);
    console.log(req);

    if(!req.body.title) {
      console.log('poop');
      res.status(400);
      res.send('Title is required')
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  }

  const get = (req, res) => {
    let query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) res.status(500).send(err);

      res.json(books);
    });
  }

  return {
    post: post,
    get: get
  }
}

module.exports = bookController;

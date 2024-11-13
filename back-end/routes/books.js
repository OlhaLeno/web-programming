const express = require('express');
const router = express.Router();
const books = require('../data/Books.json');


router.get('/books', (req, res) => {
  const { price, pages, genre } = req.query;

  

  let filteredBooks = books;

 
  if (price) {
    filteredBooks = filteredBooks.filter(book => book.price <= parseInt(price));
    
  }

  if (pages) {
    filteredBooks = filteredBooks.filter(book => book.pages <= parseInt(pages));
    
  }

  if (genre) {
    filteredBooks = filteredBooks.filter(book => book.genre === genre);
    
  }
  
  res.json(filteredBooks);
});


router.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);
  
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Книжку не знайдено' });
  }
});

module.exports = router;

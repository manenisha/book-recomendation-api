const express = require('express');
const router = express.Router();
const Book = require('../controllers/bookController');

// Add a new book.
router.post('/', Book.create);

// Retrieve book details by ID.
router.get('/:id', Book.findOne);

// List all books
router.get("/", Book.findAll);

//Update book details by ID.
router.put("/:id", Book.update);

//Delete book by ID.
router.delete("/:id", Book.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const recommendation = require('../controllers/recommendationController');


//  Get book recommendations based on genre.
router.get('/genre', recommendation.getBooksByGenre);

//  Get book recommendations based on author.
router.get('/author', recommendation.getBooksByAuthor);
module.exports = router;
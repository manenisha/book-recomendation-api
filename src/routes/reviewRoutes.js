const express = require('express');
const router = express.Router();
const Review = require('../controllers/reviewController');

// Create a new review
router.post('/', Review.create);

// Retrieve review details by ID.
router.get('/:id', Review.findOne);

// List all review
router.get("/", Review.findAll);

//Update review details by ID.
router.put("/:id", Review.update);

//Delete review by ID.
router.delete("/:id", Review.delete);

module.exports = router;
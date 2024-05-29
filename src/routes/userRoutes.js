const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');

// Create a new user
router.post('/', User.create);

// Retrieve user details by ID.
router.get('/:id', User.findOne);

//Update user details by ID.
router.put("/:id", User.update);

//Delete user by ID.
router.delete("/:id", User.delete);

module.exports = router;
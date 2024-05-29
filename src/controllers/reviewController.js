const Review = require("../models/review");
const Book = require('../models/book')
const { validateReviewCreation, validateReviewUpdation } = require('../validation/reviewRequestValidation');

// Create and Save a new review
exports.create = async (req, res) => {
    // Validate request
    const { error } = validateReviewCreation(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });

    // Create a review for book
    const review = {
        book_id: req.body.book_id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        comment: req.body.comment
    };

    // Save review in the database
    Book.findByPk(req.body.book_id)
        .then(async data => {
            if (data) {
                await Review.create(review)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).send({
                            message: `error while adding new review.`
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot find book with id=${req.body.book_id}.`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving book with id=" + req.body.book_id,
            });
        });

};

//Retrieve review details by ID.
exports.findOne = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await Review.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find review with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving review with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

//  Update review details by ID.
exports.update = async (req, res) => {
    const id = req.params.id;
    // Validate request
    const { error } = validateReviewUpdation(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });
    if (id) {
        await Review.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Review updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update review with id=${id}. Maybe review was not found or fields are empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating review with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

//  Delete review by ID.
exports.delete = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await Review.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Review deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete review with id=${id}. Maybe review was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete review with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// List all reviews.
exports.findAll = (req, res) => {
    Review.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reviews."
            });
        });
};
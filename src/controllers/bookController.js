const Book = require("../models/book");
const { validateBookCreation, validateBookUpdation } = require('../validation/bookRequestValidation');

// Create and Save a new book
exports.create = async (req, res) => {
    // Validate request
    const { error } = validateBookCreation(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });

    // Create a book
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        summary: req.body.summary,
        user_id: req.body.user_id
    };

    // Save book in the database
    await Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send({
                message: `error while adding new book.`
            });
        });
};

// Find a single book with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await Book.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find book with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving book with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// Update a book by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    // Validate request
    const { error } = validateBookUpdation(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });
    if (id) {
        await Book.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Book updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update book with id=${id}. Maybe book was not found or fields are empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating book with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// Delete a book with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await Book.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Book deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete book with id=${id}. Maybe book was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete book with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};
const User = require("../models/user")
const { validateUserCreation, validateUserUpdation } = require('../validation/userRequestValidation');

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request
    const { error } = validateUserCreation(req.body);
    console.log("validation " + error)
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });
    // Create a new user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    // Save user in the database
    await User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send({
                message: `error while creating new user.`
            });
        });
};

// Find a single user with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await User.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find user with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// Update a user by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    // Validate request
    const { error } = validateUserUpdation(req.body);
    if (error) return res.status(400).send({
        success: false,
        message: error.message
    });
    if (id) {
        await User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update users with id=${id}. Maybe User was not found or fields are empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating user with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await User.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete user with id=${id}. Maybe user was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete user with id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Bad Request: Not provided Id"
        });
    }

};
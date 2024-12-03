const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');

// Route to create a user
router.post('/users', usersController.createUser);

// Route to get all users
router.get('/users', usersController.getAllUsers);

// Route to get a user by ID
router.get('/users/:user_id', usersController.getUserById);

// Route to update a user
router.put('/users/:user_id', usersController.updateUser);

// Route to delete a user
router.delete('/users/:user_id', usersController.deleteUser);

module.exports = router;

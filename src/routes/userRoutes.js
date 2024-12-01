const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to get a user by student ID
router.get('/users/:student_id', userController.getUserByStudentId);

// Route to update a user
router.put('/users/:user_id', userController.updateUser);

// Route to delete a user
router.delete('/users/:user_id', userController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController.js');

// Route to create a student
router.post('/students', studentsController.createStudent);

// Route to get all students
router.get('/students', studentsController.getAllStudents);

// Route to get a student by ID
router.get('/students/:student_id', studentsController.getStudentById);

// Route to update a student
router.put('/students/:student_id', studentsController.updateStudent);

// Route to delete a student
router.delete('/students/:student_id', studentsController.deleteStudent);

module.exports = router;

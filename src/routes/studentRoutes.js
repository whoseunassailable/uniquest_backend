const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController.js');

// Route to create a student
router.post('/students', studentsController.createStudent);

// Routes to login a student
router.post('/students/login', studentsController.loginStudent);

// Route to get all students
router.get('/students', studentsController.getAllStudents);

// Route to get a student by ID
router.get('/students/:student_id', studentsController.getStudentById);

// Route to update a student's details (general)
router.put('/students/:student_id', studentsController.updateStudent);
/**
// Route to update preferred location
router.put('/students/:student_id/location', studentsController.updatePreferredLocation);

// Route to update GRE score
router.put('/studentsGre/:student_id', studentsController.updateGreScore);

// Route to update TOEFL score
router.put('/students/:student_id/toefl', studentsController.updateToeflScore);
 */

// Route to delete a student
router.delete('/students/:student_id', studentsController.deleteStudent);

module.exports = router;

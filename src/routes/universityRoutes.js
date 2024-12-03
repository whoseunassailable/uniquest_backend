const express = require('express');
const router = express.Router();
const universitiesController = require('../controllers/universitiesController.js');

// Route to create a university
router.post('/universities', universitiesController.createUniversity);

// Route to get all universities
router.get('/universities', universitiesController.getAllUniversities);

// Route to get a university by ID
router.get('/universities/:university_id', universitiesController.getUniversityById);

// Route to update a university
router.put('/universities/:university_id', universitiesController.updateUniversity);

// Route to delete a university
router.delete('/universities/:university_id', universitiesController.deleteUniversity);

module.exports = router;

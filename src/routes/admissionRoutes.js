const express = require('express');
const router = express.Router();
const admissionsController = require('../controllers/admissionsController.js');

// Route to create an admission
router.post('/admissions', admissionsController.createAdmission);

// Route to get all admissions
router.get('/admissions', admissionsController.getAllAdmissions);

// Route to get an admission by ID
router.get('/admissions/:admission_id', admissionsController.getAdmissionById);

// Route to update an admission
router.put('/admissions/:admission_id', admissionsController.updateAdmission);

// Route to delete an admission
router.delete('/admissions/:admission_id', admissionsController.deleteAdmission);

module.exports = router;

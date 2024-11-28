const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');

// Route to create a new admission
router.post('/admissions', admissionController.createAdmission);

// Route to get all admissions
router.get('/admissions', admissionController.getAllAdmissions);

// Route to get admissions by university ID
router.get('/admissions/university/:university_id', admissionController.getAdmissionsByUniversityId);

// Route to get admissions by program ID
router.get('/admissions/program/:program_id', admissionController.getAdmissionsByProgramId);

// Route to update an admission
router.put('/admissions/:admission_id', admissionController.updateAdmission);

// Route to delete an admission
router.delete('/admissions/:admission_id', admissionController.deleteAdmission);

module.exports = router;

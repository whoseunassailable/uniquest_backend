const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Route to create a new program
router.post('/programs', programController.createProgram);

// Route to get all programs
router.get('/programs', programController.getAllPrograms);

// Route to get programs by university ID
router.get('/programs/:university_id', programController.getProgramsByUniversityId);

// Route to update a program
router.put('/programs/:program_id', programController.updateProgram);

// Route to delete a program
router.delete('/programs/:program_id', programController.deleteProgram);

module.exports = router;

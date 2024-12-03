const express = require('express');
const router = express.Router();
const fundingController = require('../controllers/fundingController');

// Route to create funding
router.post('/funding', fundingController.createFunding);

// Route to get all funding records
router.get('/funding', fundingController.getAllFunding);

// Route to get funding by university ID
router.get('/funding/:university_id', fundingController.getFundingByUniversityId);

// Route to update funding record
router.put('/funding/:funding_id', fundingController.updateFunding);

// Route to delete funding record
router.delete('/funding/:funding_id', fundingController.deleteFunding);

module.exports = router;

const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');

// Route to create a new ranking
router.post('/rankings', rankingController.createRanking);

// Route to get all rankings
router.get('/rankings', rankingController.getAllRankings);

// Route to get rankings by university ID
router.get('/rankings/university/:university_id', rankingController.getRankingsByUniversityId);

// Route to get rankings by program ID
router.get('/rankings/program/:program_id', rankingController.getRankingsByProgramId);

// Route to update a ranking
router.put('/rankings/:ranking_id', rankingController.updateRanking);

// Route to delete a ranking
router.delete('/rankings/:ranking_id', rankingController.deleteRanking);

module.exports = router;

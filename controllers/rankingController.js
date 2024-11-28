const db = require('../config/db');

// Create a new ranking
exports.createRanking = (req, res) => {
    const { university_id, program_id, program_rank } = req.body;
    const query = 'INSERT INTO Ranking (university_id, program_id, program_rank) VALUES (?, ?, ?)';
    db.query(query, [university_id, program_id, program_rank], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Ranking created successfully', data: result });
    });
};

// Get all rankings
exports.getAllRankings = (req, res) => {
    const query = 'SELECT * FROM Ranking';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get rankings by university ID
exports.getRankingsByUniversityId = (req, res) => {
    const { university_id } = req.params;
    const query = 'SELECT * FROM Ranking WHERE university_id = ?';
    db.query(query, [university_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No rankings found for this university' });
        res.status(200).json({ data: result });
    });
};

// Get rankings by program ID
exports.getRankingsByProgramId = (req, res) => {
    const { program_id } = req.params;
    const query = 'SELECT * FROM Ranking WHERE program_id = ?';
    db.query(query, [program_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No rankings found for this program' });
        res.status(200).json({ data: result });
    });
};

// Update a ranking
exports.updateRanking = (req, res) => {
    const { ranking_id } = req.params;
    const { university_id, program_id, program_rank } = req.body;
    const query = 'UPDATE Ranking SET university_id = ?, program_id = ?, program_rank = ? WHERE ranking_id = ?';
    db.query(query, [university_id, program_id, program_rank, ranking_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Ranking record not found' });
        res.status(200).json({ message: 'Ranking record updated successfully' });
    });
};

// Delete a ranking
exports.deleteRanking = (req, res) => {
    const { ranking_id } = req.params;
    const query = 'DELETE FROM Ranking WHERE ranking_id = ?';
    db.query(query, [ranking_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Ranking record not found' });
        res.status(200).json({ message: 'Ranking record deleted successfully' });
    });
};
const db = require('../config/db');

// Create a new admission
exports.createAdmission = (req, res) => {
    const { university_id, program_id, min_gre, min_toefl, min_gpa, required_work_experience, admission_year } = req.body;
    const query = 'INSERT INTO Admissions (university_id, program_id, min_gre, min_toefl, min_gpa, required_work_experience, admission_year) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [university_id, program_id, min_gre, min_toefl, min_gpa, required_work_experience, admission_year], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Admission created successfully', data: result });
    });
};

// Get all admissions
exports.getAllAdmissions = (req, res) => {
    const query = 'SELECT * FROM Admissions';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get admissions by university ID
exports.getAdmissionsByUniversityId = (req, res) => {
    const { university_id } = req.params;
    const query = 'SELECT * FROM Admissions WHERE university_id = ?';
    db.query(query, [university_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No admissions found for this university' });
        res.status(200).json({ data: result });
    });
};

// Get admissions by program ID
exports.getAdmissionsByProgramId = (req, res) => {
    const { program_id } = req.params;
    const query = 'SELECT * FROM Admissions WHERE program_id = ?';
    db.query(query, [program_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No admissions found for this program' });
        res.status(200).json({ data: result });
    });
};

// Update an admission
exports.updateAdmission = (req, res) => {
    const { admission_id } = req.params;
    const { university_id, program_id, min_gre, min_toefl, min_gpa, required_work_experience, admission_year } = req.body;
    const query = 'UPDATE Admissions SET university_id = ?, program_id = ?, min_gre = ?, min_toefl = ?, min_gpa = ?, required_work_experience = ?, admission_year = ? WHERE admission_id = ?';
    db.query(query, [university_id, program_id, min_gre, min_toefl, min_gpa, required_work_experience, admission_year, admission_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Admission record not found' });
        res.status(200).json({ message: 'Admission record updated successfully' });
    });
};

// Delete an admission
exports.deleteAdmission = (req, res) => {
    const { admission_id } = req.params;
    const query = 'DELETE FROM Admissions WHERE admission_id = ?';
    db.query(query, [admission_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Admission record not found' });
        res.status(200).json({ message: 'Admission record deleted successfully' });
    });
};

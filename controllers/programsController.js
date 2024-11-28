const db = require('../config/db');

// Create a new program
exports.createProgram = (req, res) => {
    const { university_id, program_name, program_level, duration, tuition_fee } = req.body;
    const query = 'INSERT INTO Programs (university_id, program_name, program_level, duration, tuition_fee) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [university_id, program_name, program_level, duration, tuition_fee], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Program created successfully', data: result });
    });
};

// Get all programs
exports.getAllPrograms = (req, res) => {
    const query = 'SELECT * FROM Programs';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get programs by university ID
exports.getProgramsByUniversityId = (req, res) => {
    const { university_id } = req.params;
    const query = 'SELECT * FROM Programs WHERE university_id = ?';
    db.query(query, [university_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No programs found for this university' });
        res.status(200).json({ data: result });
    });
};

// Update a program
exports.updateProgram = (req, res) => {
    const { program_id } = req.params;
    const { university_id, program_name, program_level, duration, tuition_fee } = req.body;
    const query = 'UPDATE Programs SET university_id = ?, program_name = ?, program_level = ?, duration = ?, tuition_fee = ? WHERE program_id = ?';
    db.query(query, [university_id, program_name, program_level, duration, tuition_fee, program_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Program record not found' });
        res.status(200).json({ message: 'Program record updated successfully' });
    });
};

// Delete a program
exports.deleteProgram = (req, res) => {
    const { program_id } = req.params;
    const query = 'DELETE FROM Programs WHERE program_id = ?';
    db.query(query, [program_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Program record not found' });
        res.status(200).json({ message: 'Program record deleted successfully' });
    });
};

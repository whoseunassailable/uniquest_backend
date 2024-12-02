const db = require('../config/db');

// Create a university
exports.createUniversity = (req, res) => {
    try {
        const { name, location, rank } = req.body;

        if (!name || !location || !rank) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const query = 'INSERT INTO Universities (name, location, rank) VALUES (?, ?, ?)';

        db.query(query, [name, location, rank], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(201).json({ message: 'University created successfully', data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all universities
exports.getAllUniversities = (req, res) => {
    try {
        const query = 'SELECT * FROM Universities';
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get university by ID
exports.getUniversityById = (req, res) => {
    try {
        const { university_id } = req.params;
        const query = 'SELECT * FROM Universities WHERE university_id = ?';
        db.query(query, [university_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'University not found' });
            return res.status(200).json({ data: result[0] });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update a university
exports.updateUniversity = (req, res) => {
    try {
        const { university_id } = req.params;
        const { name, location, rank } = req.body;
        const query = 'UPDATE Universities SET name = ?, location = ?, rank = ? WHERE university_id = ?';
        db.query(query, [name, location, rank, university_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'University not found' });
            return res.status(200).json({ message: 'University updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a university
exports.deleteUniversity = (req, res) => {
    try {
        const { university_id } = req.params;
        const query = 'DELETE FROM Universities WHERE university_id = ?';
        db.query(query, [university_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'University not found' });
            return res.status(200).json({ message: 'University deleted successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

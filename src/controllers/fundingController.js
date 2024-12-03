const db = require('../config/db');

// Create funding
exports.createFunding = (req, res) => {
    const { university_id, funding_source, amount, funding_year } = req.body;
    const query = 'INSERT INTO Funding (university_id, funding_source, amount, funding_year) VALUES (?, ?, ?, ?)';
    db.query(query, [university_id, funding_source, amount, funding_year], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Funding created successfully', data: result });
    });
};

// Get all funding records
exports.getAllFunding = (req, res) => {
    const query = 'SELECT * FROM Funding';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get funding by university ID
exports.getFundingByUniversityId = (req, res) => {
    const { university_id } = req.params;
    const query = 'SELECT * FROM Funding WHERE university_id = ?';
    db.query(query, [university_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No funding found for this university' });
        res.status(200).json({ data: result });
    });
};

// Update funding record
exports.updateFunding = (req, res) => {
    const { funding_id } = req.params;
    const { university_id, funding_source, amount, funding_year } = req.body;
    const query = 'UPDATE Funding SET university_id = ?, funding_source = ?, amount = ?, funding_year = ? WHERE funding_id = ?';
    db.query(query, [university_id, funding_source, amount, funding_year, funding_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Funding record not found' });
        res.status(200).json({ message: 'Funding record updated successfully' });
    });
};

// Delete funding record
exports.deleteFunding = (req, res) => {
    const { funding_id } = req.params;
    const query = 'DELETE FROM Funding WHERE funding_id = ?';
    db.query(query, [funding_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Funding record not found' });
        res.status(200).json({ message: 'Funding record deleted successfully' });
    });
};

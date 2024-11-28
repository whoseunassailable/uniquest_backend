const db = require('../config/db');

// Create a new wishlist entry
exports.createWishlist = (req, res) => {
    const { student_id, program_id } = req.body;
    const query = 'INSERT INTO Wishlist (student_id, program_id) VALUES (?, ?)';
    db.query(query, [student_id, program_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Wishlist created successfully', data: result });
    });
};

// Get all wishlist entries
exports.getAllWishlists = (req, res) => {
    const query = 'SELECT * FROM Wishlist';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get wishlist entries for a specific student
exports.getWishlistByStudentId = (req, res) => {
    const { student_id } = req.params;
    const query = 'SELECT * FROM Wishlist WHERE student_id = ?';
    db.query(query, [student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'No wishlist found for this student' });
        res.status(200).json({ data: result });
    });
};

// Update a wishlist entry
exports.updateWishlist = (req, res) => {
    const { wishlist_id } = req.params;
    const { student_id, program_id } = req.body;
    const query = 'UPDATE Wishlist SET student_id = ?, program_id = ? WHERE wishlist_id = ?';
    db.query(query, [student_id, program_id, wishlist_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Wishlist entry not found' });
        res.status(200).json({ message: 'Wishlist entry updated successfully' });
    });
};

// Delete a wishlist entry
exports.deleteWishlist = (req, res) => {
    const { wishlist_id } = req.params;
    const query = 'DELETE FROM Wishlist WHERE wishlist_id = ?';
    db.query(query, [wishlist_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Wishlist entry not found' });
        res.status(200).json({ message: 'Wishlist entry deleted successfully' });
    });
};

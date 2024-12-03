const db = require('../config/db');

// Create a wishlist item
exports.createWishlistItem = (req, res) => {
    try {
        const { user_id, university_id, program_id } = req.body;

        if (!user_id || !university_id || !program_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const query = 'INSERT INTO Wishlist (user_id, university_id, program_id) VALUES (?, ?, ?)';

        db.query(query, [user_id, university_id, program_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(201).json({ message: 'Wishlist item created successfully', data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all wishlist items
exports.getAllWishlistItems = (req, res) => {
    try {
        const query = 'SELECT * FROM Wishlist';
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get wishlist item by ID
exports.getWishlistItemById = (req, res) => {
    try {
        const { wishlist_id } = req.params;
        const query = 'SELECT * FROM Wishlist WHERE wishlist_id = ?';
        db.query(query, [wishlist_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'Wishlist item not found' });
            return res.status(200).json({ data: result[0] });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update a wishlist item
exports.updateWishlistItem = (req, res) => {
    try {
        const { wishlist_id } = req.params;
        const { user_id, university_id, program_id } = req.body;
        const query = 'UPDATE Wishlist SET user_id = ?, university_id = ?, program_id = ? WHERE wishlist_id = ?';
        db.query(query, [user_id, university_id, program_id, wishlist_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Wishlist item not found' });
            return res.status(200).json({ message: 'Wishlist item updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a wishlist item
exports.deleteWishlistItem = (req, res) => {
    try {
        const { wishlist_id } = req.params;
        const query = 'DELETE FROM Wishlist WHERE wishlist_id = ?';
        db.query(query, [wishlist_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Wishlist item not found' });
            return res.status(200).json({ message: 'Wishlist item deleted successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

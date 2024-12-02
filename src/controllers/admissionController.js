const db = require('../config/db');

// Create a user
exports.createUser = (req, res) => {
    try {
        const { student_id, rule } = req.body;

        if (!student_id || !rule) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const query = 'INSERT INTO Users (student_id, rule) VALUES (?, ?)';

        db.query(query, [student_id, rule], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(201).json({ message: 'User created successfully', data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all users
exports.getAllUsers = (req, res) => {
    try {
        const query = 'SELECT * FROM Users';
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get user by ID
exports.getUserById = (req, res) => {
    try {
        const { user_id } = req.params;
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        db.query(query, [user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ data: result[0] });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update a user
exports.updateUser = (req, res) => {
    try {
        const { user_id } = req.params;
        const { student_id, rule } = req.body;
        const query = 'UPDATE Users SET student_id = ?, rule = ? WHERE user_id = ?';
        db.query(query, [student_id, rule, user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ message: 'User updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a user
exports.deleteUser = (req, res) => {
    try {
        const { user_id } = req.params;
        const query = 'DELETE FROM Users WHERE user_id = ?';
        db.query(query, [user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ message: 'User deleted successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

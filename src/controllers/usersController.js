const db = require('../config/db');

// Create a new user
exports.createUser = (req, res) => {
    const { student_id, rule } = req.body;
    const query = 'INSERT INTO Users (student_id, rule) VALUES (?, ?)';
    db.query(query, [student_id, rule], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created successfully', data: result });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get a user by student ID
exports.getUserByStudentId = (req, res) => {
    const { student_id } = req.params;
    const query = 'SELECT * FROM Users WHERE student_id = ?';
    db.query(query, [student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ data: result });
    });
};

// Update a user
exports.updateUser = (req, res) => {
    const { user_id } = req.params;
    const { student_id, rule } = req.body;
    const query = 'UPDATE Users SET student_id = ?, rule = ? WHERE user_id = ?';
    db.query(query, [student_id, rule, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully' });
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
    const { user_id } = req.params;
    const query = 'DELETE FROM Users WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

const db = require('../config/db');

// Create a student
exports.createStudent = (req, res) => {
    const { first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth } = req.body;
    const query = 'INSERT INTO Students (first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Student created successfully', data: result });
    });
};

// Get all students
exports.getAllStudents = (req, res) => {
    const query = 'SELECT * FROM Students';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ data: result });
    });
};

// Get a student by ID
exports.getStudentById = (req, res) => {
    const { student_id } = req.params;
    const query = 'SELECT * FROM Students WHERE student_id = ?';
    db.query(query, [student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ data: result[0] });
    });
};

// Update a student
exports.updateStudent = (req, res) => {
    const { student_id } = req.params;
    const { first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth } = req.body;
    const query = 'UPDATE Students SET first_name = ?, last_name = ?, email = ?, gre_score = ?, toefl_score = ?, preferred_location = ?, phone = ?, date_of_birth = ? WHERE student_id = ?';
    db.query(query, [first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth, student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student updated successfully' });
    });
};

// Delete a student
exports.deleteStudent = (req, res) => {
    const { student_id } = req.params;
    const query = 'DELETE FROM Students WHERE student_id = ?';
    db.query(query, [student_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    });
};

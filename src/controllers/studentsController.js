const db = require('../config/db');

// Create a student
exports.createStudent = (req, res) => {
    try {
        const { first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth } = req.body;
        const query = 'INSERT INTO Students (first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(201).json({ message: 'Student created successfully', data: result });
        });
        if (!first_name || !last_name || !email || !phone || !date_of_birth) {
            return res.status(400).json({ error: "Missing required fields" });
          }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all students
exports.getAllStudents = (req, res) => {
    try {
        const query = 'SELECT * FROM Students';
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ data: result });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get a student by ID
exports.getStudentById = (req, res) => {
    try {
        const { student_id } = req.params;
        const query = 'SELECT * FROM Students WHERE student_id = ?';
        db.query(query, [student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ data: result[0] });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update a student
exports.updateStudent = (req, res) => {
    try {
        const { student_id } = req.params;
        const { first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth } = req.body;
        const query = 'UPDATE Students SET first_name = ?, last_name = ?, email = ?, gre_score = ?, toefl_score = ?, preferred_location = ?, phone = ?, date_of_birth = ? WHERE student_id = ?';
        db.query(query, [first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth, student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ message: 'Student updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a student
exports.deleteStudent = (req, res) => {
    try {
        const { student_id } = req.params;
        const query = 'DELETE FROM Students WHERE student_id = ?';
        db.query(query, [student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ message: 'Student deleted successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

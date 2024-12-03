const db = require('../config/db');
const bcrypt = require('bcrypt');


// Create a student
exports.createStudent = async (req, res) => {
    try {
        const { student_id, first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth, password } = req.body;

        // Validate required fields
        if (!student_id || !first_name || !last_name || !email || !phone || !date_of_birth || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // SQL query to insert the student record with the provided student_id
        const query = 'INSERT INTO Students (student_id, first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(query, [student_id, first_name, last_name, email, gre_score, toefl_score, preferred_location, phone, date_of_birth, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            return res.status(201).json({
                message: 'Student created successfully',
                data: {
                    studentId: student_id, // Include the provided student_id
                    first_name,
                    last_name,
                    email,
                    gre_score,
                    toefl_score,
                    preferred_location,
                    phone,
                    date_of_birth
                }
            });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};


// Login a student
exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // SQL query to get the student by email
        const query = 'SELECT * FROM Students WHERE email = ?';
        db.query(query, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }

            const student = result[0];

            // Compare the entered password with the hashed password
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }


            return res.status(200).json({
                message: 'Login successful',
                data: {
                    studentId: student.id,
                    email: student.email,
                }
            });
        });
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

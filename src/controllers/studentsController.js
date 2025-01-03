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
/*** 
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
*/

// Update specific student fields
exports.updateStudent = (req, res) => {
    try {
        const { student_id } = req.params;
        const updates = req.body;  // The request body can contain multiple fields to update

        // Log the request for debugging
        console.log(updates);

        // Validate that the body is not empty
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // List of valid fields to be updated
        const validFields = ['first_name', 'last_name', 'gre_score', 'toefl_score', 'preferred_location', 'phone', 'date_of_birth'];

        // Check if any invalid field is provided
        for (let field in updates) {
            if (!validFields.includes(field)) {
                return res.status(400).json({ error: `Invalid field: ${field}` });
            }
        }

        // Create the SQL query dynamically by adding the valid fields
        let query = 'UPDATE Students SET ';
        let values = [];

        // Add field updates to the query
        for (let field in updates) {
            query += `${field} = ?, `;
            values.push(updates[field]);
        }

        // Remove the last comma and space from the query
        query = query.slice(0, -2); 

        query += ' WHERE student_id = ?';
        values.push(student_id); // Add student_id to the values array

        // Execute the query to update the student
        db.query(query, values, (err, result) => {
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

/** 
// Update preferred location
exports.updatePreferredLocation = (req, res) => {
    try {
        const { student_id } = req.params;
        const { preferred_location } = req.body;

        const query = 'UPDATE Students SET preferred_location = ? WHERE student_id = ?';
        db.query(query, [preferred_location, student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ message: 'Preferred location updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update GRE score
exports.updateGreScore = (req, res) => {
    try {
        //const student_id  = req.body.student_id || req.params.student_id;
        const { student_id } = req.params;
        const { gre_score } = req.body;
        console.log('Student id ', student_id, req.params);


        const query = 'UPDATE Students SET gre_score = ? WHERE student_id = ?';
        db.query(query, [gre_score, student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ message: 'GRE score updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Update TOEFL score
exports.updateToeflScore = (req, res) => {
    try {
        const { student_id } = req.params;
        const { toefl_score } = req.body;

        const query = 'UPDATE Students SET toefl_score = ? WHERE student_id = ?';
        db.query(query, [toefl_score, student_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
            return res.status(200).json({ message: 'TOEFL score updated successfully' });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
*/
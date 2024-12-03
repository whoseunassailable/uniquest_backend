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

/**
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
 */

// Update specific university fields
exports.updateUniversity = (req, res) => {
    try {
        const { university_id } = req.params;
        const updates = req.body;  // The request body can contain multiple fields to update

        // Log the request for debugging
        console.log(updates);

        // Validate that the body is not empty
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // List of valid fields to be updated
        const validFields = ['university_name', 'location'];

        // Check if any invalid field is provided
        for (let field in updates) {
            if (!validFields.includes(field)) {
                return res.status(400).json({ error: `Invalid field: ${field}` });
            }
        }

        // Create the SQL query dynamically by adding the valid fields
        let query = 'UPDATE Universities SET ';
        let values = [];

        // Add field updates to the query
        for (let field in updates) {
            query += `${field} = ?, `;
            values.push(updates[field]);
        }

        // Remove the last comma and space from the query
        query = query.slice(0, -2); 

        query += ' WHERE university_id = ?';
        values.push(university_id); // Add university_id to the values array

        // Execute the query to update the university
        db.query(query, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'University not found' });

            return res.status(200).json({ message: 'University updated successfully'});
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

// Search University 
// Search universities based on GRE, TOEFL, and GPA scores
exports.searchUniversity = (req, res) => {
    try {
        const { min_gre, min_toefl, min_gpa } = req.body;
        console.log("gre", min_gre);
        console.log("toefl", min_toefl);
        console.log("gpa", min_gpa);

        // Validate input
        if (!min_gre || !min_toefl || !min_gpa) {
            return res.status(400).json({ error: "min_gre, min_toefl, and min_gpa are required" });
        }

        // Query to find universities that meet the criteria
        const query = `
            SELECT DISTINCT u.university_id, u.university_name, u.location, u.application_deadline
            FROM Universities u
            INNER JOIN Admissions a ON u.university_id = a.university_id
            WHERE a.min_gre <= ? AND a.min_toefl <= ? AND a.min_gpa <= ?
        `;

        // Execute the query
        db.query(query, [min_gre, min_toefl, min_gpa], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "No universities match the criteria" });
            }

            return res.status(200).json({ universities: results });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};


// backend/routes/universities.js
const express = require('express');
const router = express.Router();

// Create a university
router.post('/', (req, res) => {
  const { university_name, location, application_deadline } = req.body;
  const query = `INSERT INTO Universities (university_name, location, application_deadline) 
                 VALUES (?, ?, ?)`;
  db.query(query, [university_name, location, application_deadline], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'University added successfully', id: result.insertId });
  });
});

// Read all universities
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Universities';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Read a single university
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Universities WHERE university_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json(result[0]);
  });
});

// Update a university
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { university_name, location, application_deadline } = req.body;
  const query = `UPDATE Universities SET university_name = ?, location = ?, application_deadline = ? 
                 WHERE university_id = ?`;
  db.query(query, [university_name, location, application_deadline, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University updated successfully' });
  });
});

// Delete a university
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Universities WHERE university_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University deleted successfully' });
  });
});

module.exports = router;

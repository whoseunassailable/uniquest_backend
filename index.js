const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const universityRoutes = require('./routes/universities');
const studentRoutes = require('./routes/students');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/universities', universityRoutes);
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

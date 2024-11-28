const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

// Middleware
app.use(express.json());

// Use student routes
app.use('/api', studentRoutes);
app.use('/api', fundingRoutes);
app.use('/api', programRoutes);
app.use('/api', rankingRoutes);
app.use('/api', admissionRoutes);
app.use('/api', userRoutes);

// Server listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

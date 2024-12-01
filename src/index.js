const express = require('express');
const app = express();
const cors = require("cors");
const studentRoutes = require('./routes/studentRoutes.js');
const fundingRoutes = require('./routes/fundingRoutes.js');
const programRoutes = require('./routes/programRoutes.js');
const rankingRoutes = require('./routes/rankingRoutes.js');
// const admissionRoutes = require('./routes/admissionRoutes.js');
// const universityRoutes = require('./routes/universityRoutes.js');
// const userRoutes = require('./routes/userRoutes.js');
// const wishlistRoutes = require('./routes/wishlistRoutes.js');

// Middleware
app.use(express.json());

app.get('/', (req, res) =>  {
    return res.send("Hello");
} );
app.use(cors()) 
// Use student routes
app.use('/api', studentRoutes);
app.use('/api', fundingRoutes);
app.use('/api', programRoutes);
app.use('/api', rankingRoutes);
// app.use('/api', admissionRoutes);
// app.use('/api', userRoutes);
// app.use('/api', wishlistRoutes);
// app.use('/api', universityRoutes);

// Server listening on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

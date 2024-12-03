const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';  // Store this securely in your environment variables

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;  // Attach user info to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;

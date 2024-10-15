// src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust the path as necessary

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.isAdmin) return res.sendStatus(403); // Forbidden
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { authenticateToken, isAdmin };
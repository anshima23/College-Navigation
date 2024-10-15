// src/middlewares/validation.middleware.js

const { body, validationResult } = require('express-validator');

// Example validation for creating a new user
const validateUserCreation = [
    body('username').isString().notEmpty(),
    body('passwordHash').isString().isLength({ min: 6 }),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUserCreation };
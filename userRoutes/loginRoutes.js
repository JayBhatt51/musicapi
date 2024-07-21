// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../modules/userModules/userModel'); // Adjust the path if necessary

// User login
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (user) {
            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Set a cookie with the username
                res.cookie('username', username, { httpOnly: true });
                res.status(200).json({ username, status: true });
            } else {
                // Password does not match
                res.status(401).json({ message: 'Incorrect password', status: false });
            }
        } else {
            // User does not exist
            res.status(404).json({ message: 'User does not exist', status: false });
        }
    } catch (error) {
        // Handle any other errors
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Error during login', error });
    }
});

module.exports = router;

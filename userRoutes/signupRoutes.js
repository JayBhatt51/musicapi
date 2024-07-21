// routes/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../modules/userModules/userModel');  // Adjust the path if necessary

// User signup
router.post('/', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists', status: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(200).json({ message: 'User created successfully', status: true });
    } catch (error) {
        // Handle any other errors
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Error during signup', error });
    }
});

module.exports = router;

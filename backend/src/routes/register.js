const router = require("express").Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const User = require("../models/Users");

// Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, address, username, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      address,
      username,
      password: hashedPassword, // Save the hashed password
    });
    await newUser.save();

    // Return the user information without generating a token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

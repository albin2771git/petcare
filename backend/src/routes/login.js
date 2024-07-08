const router = require("express").Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt
const User = require("../models/Users");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;




// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //console.log('Login request:', req.body);

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    console.log('User found:', user);

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password is valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '8h' } // Token expires in 8 hours
    );

    // Return the token and user information
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

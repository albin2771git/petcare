const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const url = process.env.MONGODB; // Replace with your MongoDB connection string

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define User model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String
}));

// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and password matches
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const registerRoute = require('./src/routes/register');
app.use(registerRoute);


// // Registration Route
//     app.post('/register', async (req, res) => {
//       const { username, password } = req.body;

//       try {
//         // Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//           return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Create new user
//         const newUser = new User({ username, password });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//       } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//     });

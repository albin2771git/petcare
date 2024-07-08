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



const registerRoute = require('./src/routes/register');
const loginRoute = require('./src/routes/login');
app.use(registerRoute);
app.use(loginRoute);



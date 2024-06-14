// models/User.js

const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  userId: int,
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  username: String,
  password: String
}));

module.exports = User;

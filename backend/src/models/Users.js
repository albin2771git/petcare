// models/User.js

const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
  "_id": {

      "type": "ObjectId",
      "required": true,
      "auto": true
    
  },
  "firstName": {
    "type": "String"
  },
  "lastName": {
    "type": "String"
  },
  "email": {
    "type": "String"
  },
  "address": {
    "type": "String"
  },
  "username": {
    "type": "String"
  },
  "password": {
    "type": "String"
  },
  token: {
    type: String
  }
}, {
  collection: 'users'
}));

module.exports = User;

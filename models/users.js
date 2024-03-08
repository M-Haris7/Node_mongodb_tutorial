const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum: ['developer', 'designer', 'manager', 'other'],
    required: true
  },
  mobile: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  }
});

// Create user model
const User = mongoose.model('User', userSchema);
module.exports = User;
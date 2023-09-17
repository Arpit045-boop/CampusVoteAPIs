const mongoose = require('mongoose');
// Voters or students models
const userSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isCandidate: {
    type: Boolean,
    // required: tr
  },
  isVoter: {
    type: Boolean,
    required: true
  },
 name:{
  type: String,
  required: true
 },
  dateOfBirth: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

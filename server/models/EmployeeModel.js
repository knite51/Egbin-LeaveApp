const mongoose = require('mongoose');

/**
 * Mongoose Writer schema which is a description/blueprint of how we want our data to look like
 */
const EmployeeSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  country: {
    type: String,
  },
  time_zone: {
    type: String,
   },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  isAdmin: {
    type: Boolean,
    enum: [false, true],
    required: true,
  },
  numberOfLeave: {
    type: Number,
    required: true
  },
  isVerified: {
    type: Boolean,
    enum: [false, true],
    required: true,
  }
});

// Model which provides us with an interface for interacting with our data
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;

const mongoose = require('mongoose');

/**
 * Mongoose Writer schema which is a description/blueprint of how we want our data to look like
 */
const WriterSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

// Model which provides us with an interface for interacting with our data
const WriterModel = mongoose.model('Writer', WriterSchema);

module.exports = WriterModel;

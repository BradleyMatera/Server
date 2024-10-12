// models/contactSchema.js
const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long'],
  },
  lname: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
    validate: {
      validator: (v) => v instanceof Date && !isNaN(v),
      message: 'Invalid birthday format',
    },
  },
}, { timestamps: true });  // Automatically creates `createdAt` and `updatedAt` fields

module.exports = contactSchema;
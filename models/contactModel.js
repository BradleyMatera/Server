const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  fname: { 
    type: String, 
    required: true,
    minlength: [2, 'First name must be at least 2 characters long'],
  },
  lname: { 
    type: String, 
    required: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  birthday: { 
    type: Date, 
    required: true,
    validate: {
      validator: (v) => v instanceof Date && !isNaN(v),
      message: 'Invalid date format for birthday',
    },
  },
}, { 
  timestamps: true,  // Automatically create `createdAt` and `updatedAt`
});

// Create a virtual field `id` for testing purposes
contactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized in JSON output
contactSchema.set('toJSON', { virtuals: true });

// Create the contact model from the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
const mongoose = require('mongoose');

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
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be 10 digits'],
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
  },
}, { 
  timestamps: true,  // Automatically create `createdAt` and `updatedAt`
});

contactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

contactSchema.set('toJSON', { virtuals: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
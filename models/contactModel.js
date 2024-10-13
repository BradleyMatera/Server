const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Import the pagination plugin

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 2,
  },
  lname: {
    type: String,
    required: true,
    minlength: 2,
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
  }
}, { 
  timestamps: true
});

// Apply the pagination plugin
contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', contactSchema);
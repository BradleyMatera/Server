const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true }, // Ensure that birthday is a Date object
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;
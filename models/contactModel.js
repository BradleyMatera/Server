const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
});
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ phone: 1 }, { unique: true });
contactSchema.index({ birthday: 1 }, { unique: true });


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
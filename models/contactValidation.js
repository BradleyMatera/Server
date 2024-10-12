// models/contactValidation.js
const { InvalidContactSchemaError } = require('../utils/errors');

// Validate contact data beyond the schema rules
const validateContactData = (contactData) => {
  const { fname, lname, email, phone, birthday } = contactData;

  if (!fname || !lname || !email || !phone || !birthday) {
    throw new InvalidContactSchemaError('All fields (fname, lname, email, phone, birthday) are required');
  }

  // Additional custom validation logic can go here
};

module.exports = { validateContactData };
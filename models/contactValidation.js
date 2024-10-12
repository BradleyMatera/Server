const { InvalidContactSchemaError } = require('../utils/errors');

// Validate contact data beyond the schema rules
const validateContactData = (contactData) => {
  const { fname, lname, email, phone, birthday } = contactData;

  // Log the contact data being validated
  console.log('Validating contact data:', contactData);

  if (!fname || !lname || !email || !phone || !birthday) {
    console.error('Validation failed: Missing required fields');
    throw new InvalidContactSchemaError('All fields (fname, lname, email, phone, birthday) are required');
  }

  // Additional custom validation logic can be added here
};

module.exports = { validateContactData };
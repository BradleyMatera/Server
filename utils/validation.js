const { InvalidContactSchemaError } = require('./errors');

// Function to validate contact data
const validateContactData = (contact) => {
  const requiredFields = ['fname', 'lname', 'email', 'phone', 'birthday'];

  requiredFields.forEach((field) => {
    if (!contact[field]) {
      throw new InvalidContactSchemaError(`Field ${field} is missing.`);
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email)) {
    throw new InvalidContactSchemaError('Invalid email format.');
  }

  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(contact.phone)) {
    throw new InvalidContactSchemaError('Invalid phone format.');
  }

  if (!(contact.birthday instanceof Date) || isNaN(contact.birthday.getTime())) {
    throw new InvalidContactSchemaError('Invalid birthday format.');
  }
};

module.exports = {
  validateContactData,
};
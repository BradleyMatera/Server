const validateContactData = (contact) => {
  const requiredFields = ['fname', 'lname', 'email', 'phone', 'birthday'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  requiredFields.forEach((field) => {
    if (!contact[field]) {
      throw new Error(`Field ${field} is missing.`);
    }
  });

  if (!emailRegex.test(contact.email)) {
    throw new Error('Invalid email format.');
  }

  if (!phoneRegex.test(contact.phone)) {
    throw new Error('Invalid phone format.');
  }

  // Ensure valid birthday format
  const birthday = new Date(contact.birthday);
  if (isNaN(birthday)) {
    throw new Error('Invalid birthday format. Expected YYYY-MM-DD.');
  }
};

module.exports = { validateContactData };
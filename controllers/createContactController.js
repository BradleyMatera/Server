const Contact = require('../models/contactModel');
const { validateContactData } = require('../utils/validationHelpers');

const createContact = async (req, res) => {
  const contactData = req.body;

  try {
    validateContactData(contactData);  // Custom validation function

    const newContact = new Contact(contactData);
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A contact with this email already exists' });
    }
    res.status(500).json({ error: 'Error creating contact' });
  }
};

module.exports = createContact;
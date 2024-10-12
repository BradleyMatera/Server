const mongoose = require('mongoose');
const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  try {
    console.log('Request received. Creating new contact...');
    const { fname, lname, email, phone, birthday } = req.body;

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ error: 'A contact with this email already exists.' });
    }

    const newContact = new Contact({ fname, lname, email, phone, birthday });
    await newContact.save();
    console.log('Successfully created a new contact.');
    res.status(201).json(newContact); // Use status code 201 for successful creation
  } catch (error) {
    console.error('Error creating contact:', error.message);
    res.status(500).json({ error: 'Error creating contact' });
  }
};

module.exports = createContact;
// controllers/createContactController.js
const ContactModel = require('../models/contactModel');
const { validateContactData } = require('../utils/validation');
const { DuplicateContactResourceError, InvalidContactSchemaError } = require('../utils/errors');
const formatContact = require('../utils/formatContact');

const createContact = async (req, res) => {
  try {
    validateContactData(req.body);

    const existingContact = await ContactModel.findOne({ email: req.body.email });
    if (existingContact) {
      throw new DuplicateContactResourceError('A contact with this email already exists.');
    }

    const newContact = new ContactModel(req.body);
    await newContact.save();
    res.status(201).json(formatContact(newContact));
  } catch (error) {
    if (
      error instanceof InvalidContactSchemaError ||
      error instanceof DuplicateContactResourceError
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error creating contact' });
    }
  }
};

module.exports = createContact;
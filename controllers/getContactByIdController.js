// controllers/getContactByIdController.js
const ContactModel = require('../models/contactModel');
const { ContactNotFoundError } = require('../utils/errors');
const formatContact = require('../utils/formatContact');

const getContactById = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      throw new ContactNotFoundError(`Contact with ID ${req.params.id} not found`);
    }
    res.json(formatContact(contact));
  } catch (error) {
    if (error instanceof ContactNotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Error fetching contact by ID' });
    }
  }
};

module.exports = getContactById;
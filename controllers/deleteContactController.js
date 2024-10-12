// controllers/deleteContactController.js
const ContactModel = require('../models/contactModel');
const { ContactNotFoundError } = require('../utils/errors');

const deleteContact = async (req, res) => {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!contact) {
      throw new ContactNotFoundError(`Contact with ID ${req.params.id} not found`);
    }
    res.status(204).end();
  } catch (error) {
    if (error instanceof ContactNotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Error deleting contact' });
    }
  }
};

module.exports = deleteContact;
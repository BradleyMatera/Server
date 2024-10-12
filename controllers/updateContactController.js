// controllers/updateContactController.js
const ContactModel = require('../models/contactModel');
const { validateContactData } = require('../utils/validation');
const { ContactNotFoundError, InvalidContactSchemaError } = require('../utils/errors');
const formatContact = require('../utils/formatContact');

const updateContact = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      throw new ContactNotFoundError(`Contact with ID ${req.params.id} not found`);
    }

    validateContactData(req.body);

    const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(formatContact(updatedContact));
  } catch (error) {
    if (
      error instanceof InvalidContactSchemaError ||
      error instanceof ContactNotFoundError
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error updating contact' });
    }
  }
};

module.exports = updateContact;
const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { ApiTestingError } = require('../utils/errors'); // Import custom error

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiTestingError(`Invalid ObjectId: ${id}`);
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error(`Error updating contact with ID: ${id}`, error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateContact;
const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { ApiTestingError } = require('../utils/errors'); // Import custom error

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiTestingError(`Invalid ObjectId: ${id}`);
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error(`Error fetching contact by ID: ${id}`, error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = getContactById;
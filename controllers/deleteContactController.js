const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { ApiTestingError } = require('../utils/errors'); // Import custom error

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiTestingError(`Invalid ObjectId: ${id}`);
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(`Error deleting contact with ID: ${id}`, error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteContact;
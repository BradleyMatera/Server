const Contact = require('../models/contactModel');

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: `Contact with ID ${id} not found` });
    }

    res.status(204).json();  // No content response
  } catch (error) {
    console.error(`Error deleting contact with ID ${id}:`, error.message);
    res.status(500).json({ error: `Error deleting contact with ID ${id}` });
  }
};

module.exports = deleteContact;
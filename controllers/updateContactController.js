const Contact = require('../models/contactModel');
const { validateContactData } = require('../utils/validationHelpers');

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contactData = req.body;

  try {
    validateContactData(contactData);  // Validate the incoming data

    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ error: `Contact with ID ${id} not found` });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error.message);
    res.status(500).json({ error: `Error updating contact with ID ${id}` });
  }
};

module.exports = updateContact;
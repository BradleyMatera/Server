const Contact = require('../models/contactModel');

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: `Contact with ID ${id} not found` });
    }

    res.json(contact);
  } catch (error) {
    console.error(`Error fetching contact by ID ${id}:`, error.message);
    res.status(500).json({ error: `Error fetching contact with ID ${id}` });
  }
};

module.exports = getContactById;
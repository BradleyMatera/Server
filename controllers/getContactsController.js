const api = require('../utils/axiosInstance');
const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
  try {
    console.log('Fetching contacts...');
    const { sort = 'lname', direction = 'asc', page = 1, limit = 10 } = req.query;
    
    const contacts = await Contact.find()
      .sort({ [sort]: direction === 'asc' ? 1 : -1 })  // Apply sorting
      .skip((page - 1) * limit)
      .limit(limit);  // Apply pagination

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: 'No contacts found' });
    }

    const totalContacts = await Contact.countDocuments();  // Get total count for pagination
    const totalPages = Math.ceil(totalContacts / limit);

    res.json({
      contacts,
      totalPages,
      currentPage: page,
      totalContacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

module.exports = getContacts;
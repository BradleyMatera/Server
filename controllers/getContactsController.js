const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { paginateContacts, sortContacts } = require('../utils/helpers');

const getContacts = async (req, res) => {
  try {
    console.log('Request received. Fetching all contacts...');
    
    // Extract sorting, pagination, and filtering parameters from query string
    const { sort = 'lname', direction = 'asc', page = 1, limit = 10 } = req.query;

    // Ensure page and limit are numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Fetch contacts with pagination and sorting from the database
    const contacts = await Contact.find()
      .sort({ [sort]: direction === 'asc' ? 1 : -1 })  // Sorting by field in either ascending or descending order
      .skip((pageNum - 1) * limitNum)  // Skipping documents for pagination
      .limit(limitNum);  // Limiting number of contacts returned per page

    // Get the total number of contacts for pagination calculations
    const totalContacts = await Contact.countDocuments();
    const totalPages = Math.ceil(totalContacts / limitNum);
    const currentPage = pageNum;

    console.log(`Returning ${contacts.length} contacts out of ${totalContacts} (page ${currentPage}/${totalPages})`);

    // Return paginated, sorted contacts along with pagination details
    res.json({
      contacts,
      totalPages,
      currentPage,
      totalContacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

module.exports = getContacts;
// controllers/getContactsController.js
const ContactModel = require('../models/contactModel');
const { paginateContacts, sortContacts } = require('../utils/helpers');
const formatContact = require('../utils/formatContact');

const getContacts = async (req, res) => {
  try {
    console.log('Starting to fetch contacts from database...');
    // Fetch contacts from the database
    const contacts = await ContactModel.find();
    
    // Log the contacts retrieved from the database
    console.log('Contacts fetched successfully:', contacts);
    
    // Format contacts before sending the response
    const formattedContacts = contacts.map(formatContact);

    // Send the formatted contacts as the response
    res.json(formattedContacts);
  } catch (error) {
    console.error('Detailed error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

// Meta information about the getContacts function (optional, if used in some documentation tool)
getContacts.handleName = 'getContacts';
getContacts.handleType = 'api';
getContacts.handleDescription = 'Get a list of contacts';
getContacts.handleFunctionType = 'api';
getContacts.handleFunctionName = 'getContacts';
getContacts.handleFunction = 'get';
getContacts.handleRoute = '/contacts';
getContacts.handleMethod = 'get';

module.exports = getContacts;
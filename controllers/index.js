// Importing all controller functions for modular export
const getContacts = require('./getContactsController');
const getContactById = require('./getContactByIdController');
const createContact = require('./createContactController');
const updateContact = require('./updateContactController');
const deleteContact = require('./deleteContactController');

// Exporting all controller functions in a single module to make them easily accessible in routes
module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
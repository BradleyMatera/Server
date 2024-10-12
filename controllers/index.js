// controllers/index.js

const getContacts = require('./getContactsController');
const getContactById = require('./getContactByIdController');
const createContact = require('./createContactController');
const updateContact = require('./updateContactController');
const deleteContact = require('./deleteContactController');

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
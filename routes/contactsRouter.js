// routes/contactRoutes.js
const express = require('express');
const getContacts = require('../controllers/getContactsController');
const getContactById = require('../controllers/getContactByIdController');
const createContact = require('../controllers/createContactController');
const updateContact = require('../controllers/updateContactController');
const deleteContact = require('../controllers/deleteContactController');

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
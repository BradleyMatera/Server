const express = require('express');
const getContacts = require('../controllers/getContactsController');
const getContactById = require('../controllers/getContactByIdController');
const createContact = require('../controllers/createContactController');
const updateContact = require('../controllers/updateContactController');
const deleteContact = require('../controllers/deleteContactController');
const mongoose = require('mongoose');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
});

// Routes for contacts
router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
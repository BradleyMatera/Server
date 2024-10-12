const express = require('express');
const mongoose = require('mongoose');
const getContacts = require('../controllers/getContactsController');
const getContactById = require('../controllers/getContactByIdController');
const createContact = require('../controllers/createContactController');
const updateContact = require('../controllers/updateContactController');
const deleteContact = require('../controllers/deleteContactController');

// Create a new router instance
const router = express.Router();

// Log when the router is initialized
console.log('Contacts Router Initialized');

// Middleware to validate MongoDB ObjectId for routes with an ID parameter
router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return res.status(400).json({
      error: `Invalid ID format for ID: ${id}. Please provide a valid MongoDB ObjectId.`,
    });
  }
  console.log(`Valid ObjectId: ${id}`);
  next();
});

// GET all contacts route
router.get('/', async (req, res) => {
  try {
    console.log('GET /v1/contacts: Request received. Fetching all contacts...');
    
    // Log query parameters for debugging purposes
    console.log(`Query Parameters: ${JSON.stringify(req.query)}`);
    
    await getContacts(req, res);
    console.log('GET /v1/contacts: Successfully returned contacts.');
  } catch (error) {
    console.error('GET /v1/contacts: Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error fetching contacts.' });
  }
});

// GET a specific contact by ID route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /v1/contacts/${id}: Request received. Fetching contact by ID...`);
  try {
    await getContactById(req, res);
    console.log(`GET /v1/contacts/${id}: Successfully returned contact with ID: ${id}`);
  } catch (error) {
    console.error(`GET /v1/contacts/${id}: Error fetching contact:`, error.message);
    res.status(500).json({ error: `Error fetching contact with ID: ${id}.` });
  }
});

// POST (create) a new contact route
router.post('/', async (req, res) => {
  console.log('POST /v1/contacts: Request received. Creating new contact...');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    // Validate request body fields
    if (!req.body.email || !req.body.fname || !req.body.lname) {
      console.error('POST /v1/contacts: Missing required fields.');
      return res.status(400).json({ error: 'First name, last name, and email are required.' });
    }

    await createContact(req, res);
    console.log('POST /v1/contacts: Successfully created a new contact.');
  } catch (error) {
    if (error.code === 11000) {
      console.error('POST /v1/contacts: Duplicate email error.');
      res.status(400).json({ error: 'A contact with this email already exists.' });
    } else {
      console.error('POST /v1/contacts: Error creating contact:', error.message);
      res.status(500).json({ error: 'Error creating new contact.' });
    }
  }
});

// PUT (update) an existing contact by ID route
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`PUT /v1/contacts/${id}: Request received. Updating contact with ID: ${id}...`);
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    // Validate that at least one field is being updated
    if (Object.keys(req.body).length === 0) {
      console.error('PUT /v1/contacts: No fields provided for update.');
      return res.status(400).json({ error: 'No fields provided for update.' });
    }

    await updateContact(req, res);
    console.log(`PUT /v1/contacts/${id}: Successfully updated contact with ID: ${id}`);
  } catch (error) {
    console.error(`PUT /v1/contacts/${id}: Error updating contact:`, error.message);
    res.status(500).json({ error: `Error updating contact with ID: ${id}.` });
  }
});

// DELETE a contact by ID route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /v1/contacts/${id}: Request received. Deleting contact with ID: ${id}...`);

  try {
    await deleteContact(req, res);
    console.log(`DELETE /v1/contacts/${id}: Successfully deleted contact with ID: ${id}`);
  } catch (error) {
    console.error(`DELETE /v1/contacts/${id}: Error deleting contact:`, error.message);
    res.status(500).json({ error: `Error deleting contact with ID: ${id}.` });
  }
});

// Export the router module
module.exports = router;
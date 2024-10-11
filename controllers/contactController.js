const { validateContactData } = require('@jworkman-fs/asl/src/Model/index.js');
const { 
  InvalidContactFieldError, 
  BlankContactFieldError, 
  DuplicateContactResourceError, 
  InvalidContactSchemaError, 
  ContactNotFoundError,
  InvalidContactError,
  PagerOutOfRangeError,
  PagerLimitExceededError
} = require('@jworkman-fs/asl/src/Exception/index.js');

const { filterContacts, sortContacts, Pager } = require('@jworkman-fs/asl');
const ContactModel = require('../models/contactModel');
const mongoose = require('mongoose');

/**
 * Helper function to format contacts for consistent API response.
 */
const formatContact = (contact) => ({
  id: contact._id.toString(),
  fname: contact.fname,
  lname: contact.lname,
  email: contact.email,
  phone: contact.phone,
  birthday: contact.birthday instanceof Date ? contact.birthday.toISOString() : contact.birthday,
});

/**
 * Validate if the provided ID is a valid MongoDB ObjectId.
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Handle pagination, sorting, and filtering logic.
 */
const getPaginatedResults = async (req, res) => {
  try {
    let contacts = await ContactModel.find({});

    // Apply filtering logic via headers
    const filterBy = req.get('X-Filter-By');
    const filterOperator = req.get('X-Filter-Operator');
    const filterValue = req.get('X-Filter-Value');
    
    if (filterBy && filterOperator && filterValue) {
      if (!['fname', 'lname', 'email', 'phone', 'birthday'].includes(filterBy)) {
        throw new InvalidContactSchemaError(`"${filterBy}" is not a valid field to filter by.`);
      }
      contacts = filterContacts(filterBy, filterOperator, filterValue, contacts);
    }

    // Apply sorting logic
    const sortBy = req.query.sort || 'lname';
    const direction = req.query.direction === 'desc' ? 'desc' : 'asc';
    
    if (!['fname', 'lname', 'email', 'phone', 'birthday'].includes(sortBy)) {
      throw new InvalidContactSchemaError(`"${sortBy}" is not a valid field to sort by.`);
    }
    
    contacts = sortContacts(contacts, sortBy, direction);

    // Apply pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const pager = new Pager(contacts, page, limit);

    // Handle out-of-range pages
    if (page > pager.pages) {
      throw new PagerOutOfRangeError(`Requested page ${page} is out of range. Any value of 1 through ${pager.pages} is allowed.`);
    }

    // Set pagination headers
    res.set('X-Page-Total', pager.total);
    res.set('X-Page-Next', pager.next());
    res.set('X-Page-Prev', pager.prev());

    // Return paginated, filtered, and sorted results
    res.json(pager.results().map(formatContact));
  } catch (error) {
    switch (error.constructor) {
      case PagerOutOfRangeError:
      case PagerLimitExceededError:
        return res.status(416).json({ message: error.message });
      case InvalidContactSchemaError:
        return res.status(400).json({ message: error.message });
      default:
        console.error(`Error fetching paginated results: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while retrieving contacts.' });
    }
  }
};

/**
 * Controller to get all contacts.
 */
exports.getContacts = async (req, res) => {
  try {
    await getPaginatedResults(req, res);
  } catch (error) {
    console.error(`Error fetching contacts: ${error.message}`);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};

/**
 * Controller to get a specific contact by ID.
 */
exports.getContactById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new InvalidContactError('Invalid contact ID format.');
    }

    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      throw new ContactNotFoundError('Contact not found');
    }
    res.json(formatContact(contact));
  } catch (error) {
    switch (error.constructor) {
      case InvalidContactError:
        return res.status(400).json({ message: error.message });
      case ContactNotFoundError:
        return res.status(404).json({ message: error.message });
      default:
        console.error(`Error fetching contact by ID: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while retrieving the contact.' });
    }
  }
};

/**
 * Controller to create a new contact.
 */
exports.createContact = async (req, res) => {
  try {
    validateContactData(req.body);

    const existingContact = await ContactModel.findOne({ email: req.body.email });
    if (existingContact) {
      throw new DuplicateContactResourceError('A contact with this email already exists.');
    }

    const newContact = new ContactModel(req.body);
    await newContact.save();
    res.status(303).location(`/v1/contacts/${newContact._id}`).json(formatContact(newContact));
  } catch (error) {
    switch (error.constructor) {
      case InvalidContactFieldError:
      case BlankContactFieldError:
      case DuplicateContactResourceError:
      case InvalidContactSchemaError:
        return res.status(400).json({ error: error.message });
      default:
        console.error(`Error creating contact: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while creating the contact.' });
    }
  }
};

/**
 * Controller to update a contact by ID.
 */
exports.updateContact = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new InvalidContactError('Invalid contact ID format.');
    }

    validateContactData(req.body);
    const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      throw new ContactNotFoundError('Contact not found');
    }
    res.status(200).json(formatContact(updatedContact));
  } catch (error) {
    switch (error.constructor) {
      case InvalidContactError:
        return res.status(400).json({ message: error.message });
      case ContactNotFoundError:
        return res.status(404).json({ message: error.message });
      default:
        console.error(`Error updating contact: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while updating the contact.' });
    }
  }
};

/**
 * Controller to delete a contact by ID.
 */
exports.deleteContact = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw new InvalidContactError('Invalid contact ID format.');
    }

    const contact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!contact) {
      throw new ContactNotFoundError('Contact not found');
    }
    res.status(204).end();
  } catch (error) {
    switch (error.constructor) {
      case InvalidContactError:
        return res.status(400).json({ message: error.message });
      case ContactNotFoundError:
        return res.status(404).json({ message: error.message });
      default:
        console.error(`Error deleting contact: ${error.message}`);
        return res.status(500).json({ error: 'An error occurred while deleting the contact.' });
    }
  }
};
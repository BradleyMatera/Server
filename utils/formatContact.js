// utils/formatContact.js
const formatContact = (contact) => ({
  id: contact._id ? contact._id.toString() : '',  // Ensure _id is converted to id
  fname: contact.fname || '',
  lname: contact.lname || '',
  email: contact.email || '',
  phone: contact.phone || '',
  birthday: contact.birthday ? contact.birthday.toISOString() : '',
});

module.exports = formatContact;
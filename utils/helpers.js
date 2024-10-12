// utils/helpers.js

const paginateContacts = (contacts, page = 1, limit = 10) => {
  const totalContacts = contacts.length;
  const totalPages = Math.ceil(totalContacts / limit);

  if (page > totalPages) {
    throw new PaginationResultCountError(`Requested page ${page} exceeds total pages ${totalPages}.`);
  }

  const startIndex = (page - 1) * limit;
  const paginatedContacts = contacts.slice(startIndex, startIndex + limit);

  return {
    paginatedContacts,
    totalPages,
  };
};

const sortContacts = (contacts, sortBy = 'lname', direction = 'asc') => {
  const validSortFields = ['id', 'fname', 'lname', 'email', 'phone', 'birthday'];
  if (!validSortFields.includes(sortBy)) {
    throw new InvalidContactSchemaError(`${sortBy} is not a valid sort field.`);
  }

  return contacts.sort((a, b) => {
    const valA = a[sortBy].toString().toLowerCase();
    const valB = b[sortBy].toString().toLowerCase();

    if (direction === 'desc') {
      return valA < valB ? 1 : -1;
    } else {
      return valA > valB ? 1 : -1;
    }
  });
};

module.exports = {
  paginateContacts,
  sortContacts,
};
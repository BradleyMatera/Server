// utils/errors.js

class InvalidContactSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidContactSchemaError';
  }
}

class DuplicateContactResourceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateContactResourceError';
  }

  static createErrorFromMongo(err) {
    if (err.code === 11000) {
      return new DuplicateContactResourceError('Duplicate email: a contact with this email already exists.');
    }
    return err;
  }
}

class ServerUnreachableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerUnreachableError';
  }
}

class InvalidContentTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidContentTypeError';
  }
}

class ApiTestingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiTestingError';
  }
}

class PaginationResultCountError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaginationResultCountError';
  }
}

module.exports = {
  InvalidContactSchemaError,
  DuplicateContactResourceError,
  ServerUnreachableError,
  InvalidContentTypeError,
  ApiTestingError,
  PaginationResultCountError,
};
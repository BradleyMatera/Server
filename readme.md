Updated RESTful Routes Assignment - Detailed Analysis

Assignment Overview

This assignment required building a fully RESTful API using ExpressJS and MongoDB. The API manages a list of contacts and supports CRUD (Create, Read, Update, Delete) operations, along with additional features like pagination, sorting, and filtering.

The goal was to ensure the API adhered to specific standards, with features tested through an automated test suite. This updated report documents the current status, challenges, and the troubleshooting efforts undertaken, incorporating recent changes to improve the functionality and test results.

Current Status:

The API is now closer to being fully functional, with significant progress made based on previous errors. However, several tests are still failing, particularly those related to schema validation, pagination, and CRUD operations. Below is a breakdown of the tests, troubleshooting efforts, and ongoing issues.

Test Breakdown

1. Server and Basic JSON Structure

	•	Test Results:
	•	✅ Server is reachable over port 8080.
	•	✅ API resource /v1/contacts exists and returns 2xx response.
	•	✅ API returns a valid JSON response.
	•	✅ Contacts resource returns an array of objects.
	•	✅ At least one contact is returned in the response.
	•	Troubleshooting Efforts:
	•	These tests are passing consistently. The core API structure works as expected, including server availability, JSON formatting, and resource retrieval.

2. Schema Validation

	•	Test Result:
	•	❌ Returned contacts all use the proper schema fields (id, fname, lname, email, phone, birthday).
	•	Error:

InvalidContactSchemaError: One or more contacts returned in your contacts API resource did not contain a valid contact schema.


	•	What I Tried:
	•	MongoDB to JSON Virtual ID Handling: MongoDB uses _id, but the tests expect id. A virtual id field was added to the schema using Mongoose’s virtual property to ensure the id is available in the response.
	•	Schema Validation Enhancements: Added additional schema validation checks in the contactValidation.js file to ensure every contact follows the correct structure.
	•	Ongoing Issue:
	•	Even with the virtual id field in place, the automated tests still fail. Manual tests via Postman return the expected schema, indicating a possible issue with how the test suite verifies the id field.

3. Pagination

	•	Test Results:
	•	❌ Pagination works with default parameters.
	•	❌ Pagination works without default parameters.
	•	Errors:

TypeError: PaginationResultCountError is not a constructor


	•	What I Tried:
	•	PaginateContacts Helper: Implemented a helper function to handle pagination, defaulting to 10 contacts if no pagination parameters are provided.
	•	Manual Testing: Verified that pagination works in Postman using different page and limit values.
	•	Ongoing Issue:
	•	The test suite’s pagination expectations might be hardcoded to return exactly 10 contacts, which could be causing issues when fewer contacts are present in the database. The PaginationResultCountError is now properly caught, but test failures persist.

4. Sorting

	•	Test Result:
	•	❌ Sorting works with “lname” both ascending and descending.
	•	Error:

Expected id: 35, but received id: "67096dd4d9e4df87a18dba19".


	•	What I Tried:
	•	Sorting Logic in Helpers: Sorting is handled in the sortContacts function, which sorts by lname by default and also accepts other fields like fname.
	•	ID Handling: MongoDB’s ObjectIDs are strings, while the test suite seems to expect numeric IDs.
	•	Ongoing Issue:
	•	The mismatch between the test suite’s hardcoded ID expectations and MongoDB’s string-based IDs remains a problem. While the sorting functionality works when manually tested, the tests expect a different ID format, causing them to fail.

5. Filtering

	•	Test Result:
	•	❌ Filtering works with default parameters.
	•	Error:

AxiosError: Request failed with status code 500.


	•	What I Tried:
	•	Filter Logic: Filters based on fields like lname and birthday were implemented, using query parameters instead of custom headers to match the API specification.
	•	Manual Testing: Filtering works correctly when tested via Postman, returning filtered results as expected.
	•	Ongoing Issue:
	•	The test suite fails to pass the filtering parameters correctly, resulting in a 500 status code. This may indicate that the test environment isn’t sending the expected filter criteria or that the filter logic isn’t being applied correctly in the test environment.

6. CRUD Operations

	•	Test Results:
	•	❌ Create a new contact.
	•	❌ Show a specific contact by its identifier.
	•	❌ Update a specific contact by its identifier.
	•	Errors:

AxiosError: Request failed with status code 500.


	•	What I Tried:
	•	CRUD Functionality: All CRUD operations were tested manually in Postman and worked as expected, including creating, reading, updating, and deleting contacts.
	•	ObjectId Validation: Added mongoose.Types.ObjectId.isValid(id) checks in the controller logic to ensure that valid MongoDB ObjectIDs are used in operations.
	•	Improved Error Handling: Ensured that errors like invalid ObjectIDs or missing fields are properly caught and returned with a 400 status code, instead of the generic 500 error.
	•	Ongoing Issue:
	•	While the manual tests are successful, the automated tests still fail due to internal server errors or mismatched status codes. The tests expect specific status codes (303 for creation) that differ from what the API returns (usually 200 or 201 for successful operations).

Summary of Persistent Issues

1. Schema Validation Failure

	•	The id field returned by MongoDB (as _id) is correctly mapped to id using virtuals, but the test suite continues to fail, potentially due to test environment issues or stricter expectations for field handling.

2. Pagination, Sorting, and Filtering

	•	Although these features work manually, they fail in the test suite due to mismatches in ID formatting, hardcoded expectations, or improperly passed parameters.

3. CRUD Operation Failures

	•	CRUD operations work manually, but the tests fail due to internal server errors, timeouts, or mismatched status codes.

Next Steps:

	1.	Investigate MongoDB vs Test Suite ID Handling:
	•	Look into how MongoDB-generated IDs (strings) are causing issues with hardcoded numeric IDs in the test suite.
	2.	Examine Filtering in the Test Environment:
	•	Investigate further why the test suite fails to pass filtering parameters properly.
	3.	Review Pagination Logic for Edge Cases:
	•	Ensure that pagination logic handles both default and custom parameters consistently, and investigate any edge cases causing failures in the test suite.
	4.	Resolve CRUD Operation Status Code Mismatches:
	•	Adjust the status codes returned by the API to match the test suite’s expectations, particularly for create operations (expected 303 vs returned 201).

Final Thoughts

While the API works well in manual tests, the automated testing environment exposes several issues, particularly with how MongoDB IDs, pagination, and CRUD operations are handled. Moving forward, aligning the API responses and status codes with the test suite’s expectations, and addressing MongoDB ID formatting issues, should help resolve the remaining test failures.
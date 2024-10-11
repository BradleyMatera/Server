# Detailed Breakdown of Issues with RESTful Routes Assignment for WDV442-O 01

### Where I am in the Assignment:

I’ve successfully implemented the core functionality of a RESTful API for managing contacts using ExpressJS. The API includes CRUD operations (Create, Read, Update, Delete) along with pagination, filtering, and sorting features. However, as I moved into testing, I encountered numerous issues. Although much of the functionality works correctly when tested manually through Postman, running the test suite has revealed a significant number of failures, both functional and structural. Below, I’ll break down the specifics of each failure, what I’ve tried, and what issues persist.

## Test Results:

Here’s a breakdown of the test results, with specifics on each section of the test and how I’ve tried to resolve the issues:

1. Server and Basic JSON Structure:

	•	Test Results:
	•	✅ Server is reachable over port 8080.
	•	✅ API resource /v1/contacts exists and returns 2xx response.
	•	✅ API returns a valid JSON response.
	•	✅ Contacts resource returns an array of objects.
	•	✅ At least one contact is returned in the response.
	•	No Issues Here:
	•	The basic server and API structure are functioning correctly. The API is reachable, and basic GET requests return valid JSON as expected.

2. Schema Validation:

	•	Test Failure:
	•	❌ Returned contacts all use the proper schema fields.
	•	Error: InvalidContactSchemaError: One or more contacts returned in your contacts API resource did not contain a valid contact schema containing all of the required fields (id, fname, lname, phone, email, birthday).
	•	Details:
	•	The schema validation test is failing because the test expects each contact object to have the following fields: id, fname, lname, email, phone, birthday.
	•	The exact error suggests that one or more of these fields are either missing or not correctly formatted.
	•	What I Tried:
	•	Schema Verification: I double-checked my ContactModel to ensure that all fields (id, fname, lname, email, phone, birthday) were properly included in the contact objects returned by the API.
	•	Manual Tests: I manually retrieved contacts via Postman, and the response included all the expected fields. However, despite confirming that all required fields are present, the test suite still fails.
	•	Logging: I added logging to the response to verify that the returned contacts are indeed including the correct schema fields.
	•	Ongoing Issue:
	•	Despite verifying that the schema is correct in both manual tests and via logging, the test continues to fail. The error may stem from a difference in expectations between the test suite and my implementation, such as how id is being generated or returned.

3. Pagination:

	•	Test Failures:
	•	❌ Pagination works with default parameters.
	•	❌ Pagination works without default parameters.
	•	Errors:
	•	Default Pagination Test:
	•	TypeError: PaginationResultCountError is not a constructor
	•	Custom Pagination Test:
	•	AxiosError: Request failed with status code 500
	•	Assertion Failure: Expected two assertions to be called, but received zero assertions.
	•	Details:
	•	Pagination Result Count: The default pagination test expects exactly 10 contacts to be returned when no pagination parameters (page and limit) are defined. The error message (PaginationResultCountError) suggests that the test expects 10 results, but either fewer or more results are being returned.
	•	Custom Pagination: When specific pagination parameters (e.g., page=4&limit=5) are provided, the API returns a status code 500, indicating an internal server error.
	•	What I Tried:
	•	Default Pagination: I implemented pagination in the contacts controller, setting the default limit to 10 if no parameters are provided. This works correctly in Postman, where the API returns 10 results by default.
	•	Custom Pagination: I handled pagination logic for custom parameters (page and limit). Manually testing this via Postman returns the correct number of results based on the provided parameters.
	•	Error Handling: I checked for potential errors in how pagination parameters are parsed and handled within the API but found nothing obvious.
	•	Ongoing Issue:
	•	The test suite still fails, either because it is not recognizing the pagination behavior or because it is encountering a deeper error (e.g., how the paginator defaults are handled).

4. Sorting:

	•	Test Failures:
	•	❌ Sorting works with “lname” both ascending and descending.
	•	Error: Expected id: 35, but received id: "67096dd4d9e4df87a18dba19".
	•	Details:
	•	The sorting test checks whether the API correctly sorts contacts by last name (lname) in both ascending (asc) and descending (desc) order.
	•	The test expects specific id values in the response (e.g., 35, 227, etc.), but my implementation returns different id values (e.g., "67096dd4d9e4df87a18dba19").
	•	This suggests that the test is hardcoded to expect specific id values that do not align with my database or how I generate contact IDs.
	•	What I Tried:
	•	Sorting Logic: I implemented sorting logic in the controller that handles sorting by lname and fname in both directions. Manually testing this via Postman returns sorted results as expected.
	•	Testing Different ID Formats: Since the test is expecting hardcoded id values, I explored whether my MongoDB-generated IDs are causing a mismatch. MongoDB uses string-based IDs (e.g., "67096dd4d9e4df87a18dba19") instead of numeric IDs, which may be why the test fails.
	•	Ongoing Issue:
	•	The test suite is likely failing because it expects specific hardcoded id values that do not match MongoDB’s ID format. Even though the sorting functionality is correct, the test cannot pass due to mismatched expectations for id.

5. Filtering:

	•	Test Failure:
	•	❌ Filtering works with default parameters.
	•	Error: AxiosError: Request failed with status code 500
	•	Details:
	•	The filtering test checks whether the API correctly handles filtering using custom HTTP headers (X-Filter-By, X-Filter-Operator, X-Filter-Value). These headers define which field to filter by, which comparison operator to use, and the value to compare.
	•	The test fails with an internal server error (500), indicating that my filtering logic is either not handling the header-based filters correctly or the API encounters an error when applying the filters.
	•	What I Tried:
	•	Filtering Implementation: I implemented filtering logic that processes the custom HTTP headers to filter contacts based on lname, birthday, and other fields.
	•	Manual Testing: In Postman, filtering works as expected. For example, I can filter contacts by lname or birthday using the custom headers, and the API returns the correct filtered results.
	•	Error Logging: I added logging to the API to capture the exact headers being passed and verified that the filtering logic is applied correctly.
	•	Ongoing Issue:
	•	Despite working manually in Postman, the test suite encounters a 500 error during filtering. The error could be related to how the test passes headers or how filtering logic interacts with the rest of the request processing.

6. CRUD Operations:

	•	Test Failures:
	•	❌ Create a new contact.
	•	Error: Expected status code 303, but received 500.
	•	Timeout: Exceeded timeout of 5000 ms.
	•	❌ Show a specific contact by its identifier.
	•	Error: Axios request failed with status code 500.
	•	❌ Update a specific contact by its identifier.
	•	Error: Axios request failed with status code 500.
	•	Details:
	•	The CRUD operation tests check whether I can create, retrieve, update, and delete contacts by their id. The tests fail with internal server errors (500) for creating, retrieving, and updating contacts.
	•	The create test also encounters a timeout, suggesting that the server is not responding quickly enough or the request isn’t being processed as expected.
	•	What I Tried:
	•	Manual Testing: All CRUD operations work manually when tested via Postman. I can create new contacts, retrieve them by id, update them, and delete them. The operations return the correct responses, including the expected status codes.
	•	Timeout Investigation: For the create operation, I increased the request timeout in the test, but the test still fails due to either server errors or a mismatch in expected responses.
	•	Ongoing Issue:
	•	The test suite fails to recognize successful CRUD operations due to internal server errors and mismatched expectations for response codes (e.g., expecting 303 but receiving 500). Although the operations work manually, the test suite cannot pass due to these issues.

Conclusion:

At this point, I’ve exhausted many avenues to resolve the issues. While the API works as expected when tested manually via Postman, the automated test suite fails for several reasons:

	•	Schema Validation: The schema appears correct, but the test is failing, likely due to differences in how id values are being handled.
	•	Pagination, Sorting, and Filtering: These features are implemented and work manually, but the test suite fails due to errors in how they interact with the request and response cycle.
	•	CRUD Operations: The tests fail due to internal server errors and mismatched status codes.

I’ll need to further investigate how the test suite is interacting with my API and whether there are discrepancies in expected responses (e.g., hardcoded id values or status codes). I also suspect that some of the issues might be related to environment setup or the way the tests are structured to interact with my Docker-based environment.
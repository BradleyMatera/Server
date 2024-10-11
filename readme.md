# **RESTful Routes Assignment - Detailed Analysis**

## **Assignment Overview**

This assignment required building a fully RESTful API using ExpressJS. The API manages a list of contacts and supports CRUD (Create, Read, Update, Delete) operations. In addition to basic CRUD, I was tasked with implementing advanced features like pagination, filtering, and sorting.

The goal is to ensure the API adheres to specific standards, with features tested through an automated test suite. This report documents the current status, challenges, and the troubleshooting efforts undertaken.

---

## **Current Status:**
As of now, the API is **partially functional**. While the core API works manually via Postman, the **automated tests** reveal several issues. Below is a detailed breakdown of where the tests are failing, what I have done to troubleshoot, and the persistent issues.

---

## **Test Breakdown**

### **1. Server and Basic JSON Structure**

- **Test Results:**
  - ✅ **Server is reachable over port 8080.**
  - ✅ **API resource `/v1/contacts` exists and returns 2xx response.**
  - ✅ **API returns a valid JSON response.**
  - ✅ **Contacts resource returns an array of objects.**
  - ✅ **At least one contact is returned in the response.**

- **Troubleshooting Efforts:**
  - No issues encountered in this section. The basic structure and functionality of the API are working as expected.

---

### **2. Schema Validation**

- **Test Result:**
  - ❌ **Returned contacts all use the proper schema fields** (`id`, `fname`, `lname`, `email`, `phone`, `birthday`).

- **Error:**
  ```bash
  InvalidContactSchemaError: One or more contacts returned in your contacts API resource did not contain a valid contact schema.

	•	What I Tried:
	•	Schema Verification: I verified that all required fields are included in the returned contacts.
	•	Logging: Added logging to confirm that contacts returned include the correct fields.
	•	Manual Testing: Checked the output via Postman; schema appeared correct.
	•	Ongoing Issue:
	•	Despite the schema being correct in manual tests, the automated tests still fail. This could be due to differences in how the id field is handled between the test suite and MongoDB’s generated IDs.

3. Pagination

	•	Test Results:
	•	❌ Pagination works with default parameters.
	•	❌ Pagination works without default parameters.
	•	Errors:
	•	Default Pagination:

TypeError: PaginationResultCountError is not a constructor


	•	Custom Pagination:

AxiosError: Request failed with status code 500.


	•	What I Tried:
	•	Implemented Pagination: Default limit set to 10 contacts, with custom pagination handled via query parameters (page, limit).
	•	Manual Testing: Verified that pagination works as expected in Postman.
	•	Error Handling: Investigated parsing issues but found no significant errors in the pagination logic.
	•	Ongoing Issue:
	•	The tests fail even though the pagination works when manually tested. This could be an issue with the test’s hardcoded expectations or a difference in handling pagination logic.

4. Sorting

	•	Test Result:
	•	❌ Sorting works with “lname” both ascending and descending.
	•	Error:

Expected id: 35, but received id: "67096dd4d9e4df87a18dba19".


	•	What I Tried:
	•	Implemented Sorting Logic: Sorting by lname and fname works manually when tested.
	•	Checked ID Format: MongoDB uses string-based IDs, while the test expects numeric IDs (e.g., 35).
	•	Ongoing Issue:
	•	The test suite expects hardcoded numeric IDs, but MongoDB generates string-based IDs. This discrepancy causes the sorting test to fail, even though the sorting functionality is correct.

5. Filtering

	•	Test Result:
	•	❌ Filtering works with default parameters.
	•	Error:

AxiosError: Request failed with status code 500.


	•	What I Tried:
	•	Implemented Filtering Logic: Filters based on lname, birthday, etc., using custom HTTP headers (X-Filter-By, X-Filter-Operator, X-Filter-Value).
	•	Manual Testing: Verified that filtering works in Postman, returning correct results.
	•	Error Logging: Captured headers and verified that the filtering logic is correctly applied.
	•	Ongoing Issue:
	•	Filtering works manually, but the test suite returns a 500 error, indicating that the headers may not be passed or processed correctly in the test environment.

6. CRUD Operations

	•	Test Results:
	•	❌ Create a new contact.
	•	Error: Expected status code 303, but received 500.
	•	Timeout: Exceeded timeout of 5000 ms.
	•	❌ Show a specific contact by its identifier.
	•	Error: Request failed with status code 500.
	•	❌ Update a specific contact by its identifier.
	•	Error: Request failed with status code 500.
	•	What I Tried:
	•	Manual CRUD Operations: All CRUD operations (Create, Read, Update, Delete) work when manually tested in Postman.
	•	Timeout Investigation: Increased timeout for the test, but it still fails due to a mismatch between expected and actual status codes (303 vs 500).
	•	Ongoing Issue:
	•	The tests fail due to internal server errors and mismatched status codes. The operations work when manually tested, but the automated test suite does not recognize successful operations.

Summary of Issues & Next Steps

Summary of Persistent Issues:

	•	Schema Validation Failure: Although fields appear correct in manual tests, the test suite continues to throw schema errors.
	•	Pagination, Sorting, and Filtering Failures: Even though these features work manually, they fail during automated testing due to mismatched expectations and internal server errors.
	•	CRUD Operation Failures: CRUD operations work manually, but fail in the test environment due to errors and timeouts.

Next Steps:

	1.	Investigate MongoDB vs Test Suite ID Handling: Look into how MongoDB-generated IDs (strings) are causing issues with hardcoded numeric IDs in the test suite.
	2.	Examine Filtering Headers in the Test Environment: Further investigate why the test suite fails to pass custom filtering headers.
	3.	Review Pagination Logic for Edge Cases: Ensure that pagination logic is handling defaults and custom parameters as expected.
	4.	Resolve CRUD Operation Status Code Mismatches: Investigate why the API is returning 500 errors during automated CRUD tests but works manually.

Final Thoughts:

Although the API works well in manual tests, the automated testing environment exposes several issues related to schema validation, pagination, sorting, filtering, and CRUD operations. Moving forward, I’ll focus on aligning the API’s response structure and status codes with the test suite’s expectations, especially regarding how MongoDB handles IDs and pagination defaults.
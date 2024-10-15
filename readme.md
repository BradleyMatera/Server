## 🌌 Star Tracker API - CRUD Operations Demo 🚀

This document demonstrates how to perform all CRUD (Create, Read, Update, Delete) operations for the Star Tracker API. The API contains three celestial resources: Galaxies, Planets, and Stars.

🛠 Requirements:

	•	Node.js and npm
	•	Docker (if using a Docker setup)
	•	cURL

🚀 Running the API:

Ensure your API is running locally. If you’re using Docker, run:

docker-compose up --build

The API will be accessible at http://localhost:3000.

🌌 CRUD Operations for Galaxies

1. 🌟 Create a Galaxy (POST)

curl -X POST http://localhost:3000/galaxies -H "Content-Type: application/json" -d '{
  "name": "Milky Way",
  "size": "Large"
}'

Response:

{
  "id": 1,
  "name": "Milky Way",
  "size": "Large",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:00:00.000Z"
}

2. 🔭 Get All Galaxies (GET)

curl -X GET http://localhost:3000/galaxies

Response:

[
  {
    "id": 1,
    "name": "Milky Way",
    "size": "Large",
    "createdAt": "2024-10-15T20:00:00.000Z",
    "updatedAt": "2024-10-15T20:00:00.000Z"
  }
]

3. ✏️ Update a Galaxy (PUT)

curl -X PUT http://localhost:3000/galaxies/1 -H "Content-Type: application/json" -d '{
  "name": "Andromeda",
  "size": "Massive"
}'

Response:

{
  "id": 1,
  "name": "Andromeda",
  "size": "Massive",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:05:00.000Z"
}

4. 🗑️ Delete a Galaxy (DELETE)

curl -X DELETE http://localhost:3000/galaxies/1

Response:

true

🪐 CRUD Operations for Planets

1. 🌍 Create a Planet (POST)

curl -X POST http://localhost:3000/planets -H "Content-Type: application/json" -d '{
  "name": "Earth",
  "size": "Medium"
}'

Response:

{
  "id": 1,
  "name": "Earth",
  "size": "Medium",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:00:00.000Z"
}

2. 🌍 Get All Planets (GET)

curl -X GET http://localhost:3000/planets

Response:

[
  {
    "id": 1,
    "name": "Earth",
    "size": "Medium",
    "createdAt": "2024-10-15T20:00:00.000Z",
    "updatedAt": "2024-10-15T20:00:00.000Z"
  }
]

3. ✏️ Update a Planet (PUT)

curl -X PUT http://localhost:3000/planets/1 -H "Content-Type: application/json" -d '{
  "name": "Mars",
  "size": "Small"
}'

Response:

{
  "id": 1,
  "name": "Mars",
  "size": "Small",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:05:00.000Z"
}

4. 🗑️ Delete a Planet (DELETE)

curl -X DELETE http://localhost:3000/planets/1

Response:

true

🌟 CRUD Operations for Stars

1. ☀️ Create a Star (POST)

curl -X POST http://localhost:3000/stars -H "Content-Type: application/json" -d '{
  "name": "Sun",
  "size": "Large"
}'

Response:

{
  "id": 1,
  "name": "Sun",
  "size": "Large",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:00:00.000Z"
}

2. ☀️ Get All Stars (GET)

curl -X GET http://localhost:3000/stars

Response:

[
  {
    "id": 1,
    "name": "Sun",
    "size": "Large",
    "createdAt": "2024-10-15T20:00:00.000Z",
    "updatedAt": "2024-10-15T20:00:00.000Z"
  }
]

3. ✏️ Update a Star (PUT)

curl -X PUT http://localhost:3000/stars/1 -H "Content-Type: application/json" -d '{
  "name": "Alpha Centauri",
  "size": "Massive"
}'

Response:

{
  "id": 1,
  "name": "Alpha Centauri",
  "size": "Massive",
  "createdAt": "2024-10-15T20:00:00.000Z",
  "updatedAt": "2024-10-15T20:05:00.000Z"
}

4. 🗑️ Delete a Star (DELETE)

curl -X DELETE http://localhost:3000/stars/1

Response:

true
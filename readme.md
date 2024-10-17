## 🌌 Star Tracker API 🚀

	A comprehensive API to manage Galaxies, Planets, and Stars. This guide will walk you through the process of setting up the API, launching it via Docker, troubleshooting issues, and performing CRUD operations using cURL.

🛠 Prerequisites

Before you begin, ensure you have the following installed:

	•	Node.js v18+ (use nvm for Node version management)
	•	npm (Node Package Manager)
	•	Docker (for running the containers)
	•	cURL (for testing HTTP requests)

Install Node.js using nvm:

nvm install 18
nvm use 18
nvm alias default 18  # Set Node v18 as the default version

Verify the Node.js version:

node -v
# Output should be: v18.x.x

🚀 Setup and Launch Instructions

1. Clone the Repository:

git clone https://github.com/your-repo/star-tracker-api.git
cd star-tracker-api

2. Docker Compose Setup:

To build and run the Docker containers:

docker-compose up --build

This will create and start the containers for both Node.js and MySQL.

3. Accessing the Node.js Container:

To open a shell inside the running Node.js container:

docker exec -it contactbookapi-wdv442-node-1 sh

📜 Database Migrations

Ensure the database schema is up-to-date by running:

npx sequelize-cli db:migrate

If the migration is successful, you’ll see an output like:

== 20241015185445-create-stars-table: migrated (0.013s)

🧑‍💻 API Testing with cURL

🌌 Galaxies

1. Create a Galaxy:

curl -X POST http://localhost:3000/galaxies -H "Content-Type: application/json" -d '{
  "name": "Milky Way",
  "size": "Large"
}'

2. Get All Galaxies:

curl -X GET http://localhost:3000/galaxies

3. Update a Galaxy:

curl -X PUT http://localhost:3000/galaxies/1 -H "Content-Type: application/json" -d '{
  "name": "Andromeda",
  "size": "Massive"
}'

4. Delete a Galaxy:

curl -X DELETE http://localhost:3000/galaxies/1

🪐 Planets

1. Create a Planet:

curl -X POST http://localhost:3000/planets -H "Content-Type: application/json" -d '{
  "name": "Earth",
  "size": "Medium"
}'

2. Get All Planets:

curl -X GET http://localhost:3000/planets

3. Update a Planet:

curl -X PUT http://localhost:3000/planets/1 -H "Content-Type: application/json" -d '{
  "name": "Mars",
  "size": "Small"
}'

4. Delete a Planet:

curl -X DELETE http://localhost:3000/planets/1

☀️ Stars

1. Create a Star:

curl -X POST http://localhost:3000/stars -H "Content-Type: application/json" -d '{
  "name": "Sun",
  "size": "Large"
}'

2. Get All Stars:

curl -X GET http://localhost:3000/stars

3. Update a Star:

curl -X PUT http://localhost:3000/stars/1 -H "Content-Type: application/json" -d '{
  "name": "Alpha Centauri",
  "size": "Large"
}'

4. Delete a Star:

curl -X DELETE http://localhost:3000/stars/1

🔄 Rebuilding Docker Containers

If you’ve made changes or something isn’t working correctly, you may need to rebuild the Docker containers:

docker-compose down
docker-compose up --build

This will stop, rebuild, and restart the containers.

💥 Troubleshooting

1. Node.js Version Issues:

If you’re running into issues related to Node.js versions, ensure you’re using v18:

nvm use 18

2. MaxListenersExceededWarning:

If you encounter a warning related to event listeners:

require('events').EventEmitter.defaultMaxListeners = 15;

3. Docker Not Working:

	•	Check logs for any issues:

docker logs contactbookapi-wdv442-node-1

	•	Rebuild the containers if necessary:

docker-compose down
docker-compose up --build

4. Sequelize Errors:

If Sequelize throws errors about missing tables, try rerunning the migrations:

npx sequelize-cli db:migrate

📜 Additional Commands

Check Running Containers:

To check if your containers are running:

docker ps

Access MySQL Container:

docker exec -it contactbookapi-wdv442-mysql-1 sh

MySQL Shell:

To interact with the database in MySQL, run this in the MySQL container:

mysql -u root -p

Enter the MySQL root password when prompted.

🎯 Conclusion

You’ve now set up and run the Star Tracker API, successfully performed CRUD operations using cURL, and learned how to troubleshoot common issues. Feel free to adjust this guide as your project evolves!

Happy Coding! ✨
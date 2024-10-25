🌌 Star Tracker API 🚀

A comprehensive API to manage Galaxies, Planets, and Stars. This guide will walk you through the process of setting up the API, launching it via Docker, troubleshooting issues, performing CRUD operations using cURL, and understanding how the application meets specific requirements for handling content types, image uploads, and styling.

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

2. Install Dependencies:

npm install

3. Docker Compose Setup:

To build and run the Docker containers:

docker-compose up --build

This will create and start the containers for both Node.js and MySQL.

4. Accessing the Node.js Container:

To open a shell inside the running Node.js container:

docker-compose exec wdv442-node sh

📜 Database Migrations

Ensure the database schema is up-to-date by running:

npx sequelize-cli db:migrate

If the migration is successful, you’ll see an output like:

== 20231025185445-create-planets: migrated (0.013s)
== 20231025185446-create-stars: migrated (0.012s)
== 20231025185447-create-galaxies: migrated (0.011s)
== 20231025185500-add-imagePath-to-planets: migrated (0.010s)
== 20231025185501-add-imagePath-to-stars: migrated (0.009s)
== 20231025185502-add-imagePath-to-galaxies: migrated (0.008s)

🧑‍💻 API Testing with cURL

The application supports both HTML and JSON formats. You can test the API endpoints using cURL to verify JSON responses.

🌌 Galaxies

1. Create a Galaxy:

curl -X POST http://localhost:4000/galaxies \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Milky Way"
         }'

2. Get All Galaxies:

curl -X GET http://localhost:4000/galaxies \
     -H "Accept: application/json"

3. Update a Galaxy:

curl -X PUT http://localhost:4000/galaxies/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Andromeda"
         }'

4. Delete a Galaxy:

curl -X DELETE http://localhost:4000/galaxies/1

🪐 Planets

1. Create a Planet:

curl -X POST http://localhost:4000/planets \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Earth"
         }'

2. Get All Planets:

curl -X GET http://localhost:4000/planets \
     -H "Accept: application/json"

3. Update a Planet:

curl -X PUT http://localhost:4000/planets/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Mars"
         }'

4. Delete a Planet:

curl -X DELETE http://localhost:4000/planets/1

☀️ Stars

1. Create a Star:

curl -X POST http://localhost:4000/stars \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Sun"
         }'

2. Get All Stars:

curl -X GET http://localhost:4000/stars \
     -H "Accept: application/json"

3. Update a Star:

curl -X PUT http://localhost:4000/stars/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Alpha Centauri"
         }'

4. Delete a Star:

curl -X DELETE http://localhost:4000/stars/1

🌐 Accessing the Application via Browser

The application also supports HTML responses and can be accessed via a web browser.

	•	Home Page: http://localhost:4000/
	•	Galaxies: http://localhost:4000/galaxies
	•	Stars: http://localhost:4000/stars
	•	Planets: http://localhost:4000/planets

📸 Image Upload Capability

The application allows you to upload images for Planets, Stars, and Galaxies.

Uploading Images:

	•	When creating or editing a resource, you can upload an image using the provided form.
	•	The image is saved to the server and displayed on the resource’s page.

Technical Implementation:

Middleware (middlewares/upload.js):

	•	Purpose: Handles image uploads using multer.
	•	Code:

// middlewares/upload.js

const multer = require('multer');
const path = require('path');

function upload(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public', 'uploads', folderName));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });

  return multer({ storage: storage });
}

module.exports = upload;


	•	Explanation:
	•	Defines a function upload that accepts a folderName to determine where to store uploaded files.
	•	Uses multer.diskStorage to set the destination and filename of uploaded files.
	•	Generates unique filenames to prevent collisions.

Controllers (controllers/planet.js, controllers/star.js, controllers/galaxy.js):

	•	Purpose: Handles the creation and updating of resources, including image paths.
	•	Code Example (Planet Controller):

// controllers/planet.js

const { Planet } = require('../models');
const path = require('path');

// Create a new planet
const create = async (req, res) => {
  try {
    const { name } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `uploads/planets/${req.file.filename}`;
    }

    const planet = await Planet.create({ name, imagePath });

    // Respond based on Accept header
    if (req.accepts('html')) {
      res.redirect(`/planets/${planet.id}`);
    } else if (req.accepts('json')) {
      res.status(201).json(planet);
    } else {
      res.status(406).send('Not Acceptable');
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};


	•	Explanation:
	•	Checks if an image file was uploaded (req.file) and constructs the imagePath.
	•	Saves the imagePath to the database along with other resource data.
	•	Responds with a redirect or JSON based on the Accept header.

Views (Twig Templates):

	•	Purpose: Display images in the frontend.
	•	Code Example (Planet Show Template):

<!-- views/planets/show.twig -->

{% extends 'layout.twig' %}

{% block title %}{{ planet.name }}{% endblock %}

{% block content %}
  <h2>{{ planet.name }}</h2>
  {% if planet.imagePath %}
    <img src="{{ asset(planet.imagePath) }}" alt="{{ planet.name }}" width="300">
  {% endif %}
  <p>ID: {{ planet.id }}</p>
  <!-- ... rest of the template ... -->
{% endblock %}


	•	Explanation:
	•	Uses the custom asset function to generate the correct URL for the image.
	•	Displays the image if imagePath exists.

🎨 Basic Styling with CSS

The application includes basic styling to enhance the user experience.

CSS Stylesheet (public/css/style.css):

	•	Linking CSS in layout.twig:

<!-- views/layout.twig -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}Star Tracker{% endblock %}</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<!-- ... rest of the template ... -->


	•	Styling Elements:
	•	Header and Footer:

/* public/css/style.css */

header, footer {
  background-color: #333;
  color: #fff;
  padding: 1em;
}

nav a {
  color: #fff;
  margin: 0 1em;
  text-decoration: none;
}


	•	Main Content:

main {
  margin: 2em;
}

h2 {
  color: #333;
}


	•	Explanation:
	•	Provides consistent styling across all pages.
	•	Enhances the visual layout without being overly complex.

⚙️ Support for CRUD Methods in Both HTML and JSON

Handling Content Types:

The application checks the Accept header to determine the response format.

Where This Happens:

	•	Files:
	•	controllers/planet.js
	•	controllers/star.js
	•	controllers/galaxy.js

Example Implementation (controllers/planet.js):

// controllers/planet.js

const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      if (req.accepts('html')) {
        res.render('planets/show', { planet });
      } else if (req.accepts('json')) {
        res.status(200).json(planet);
      } else {
        res.status(406).send('Not Acceptable');
      }
    } else {
      if (req.accepts('html')) {
        res.status(404).render('error', { error: 'Planet not found' });
      } else if (req.accepts('json')) {
        res.status(404).json({ error: 'Planet not found' });
      } else {
        res.status(406).send('Not Acceptable');
      }
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

Explanation:

	•	Why in Controllers:
	•	Controllers are responsible for handling requests and determining the response.
	•	Checking the Accept header here allows us to tailor the response format before sending it to the client.
	•	How It Works:
	•	req.accepts('html'):
	•	Checks if the client accepts HTML responses.
	•	If true, renders the appropriate Twig template.
	•	req.accepts('json'):
	•	Checks if the client accepts JSON responses.
	•	If true, sends a JSON-formatted response.
	•	res.status(406).send('Not Acceptable'):
	•	If the client does not accept HTML or JSON, responds with a 406 Not Acceptable status code.

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

// index.js

require('events').EventEmitter.defaultMaxListeners = 15;

Place this at the top of your index.js file.

3. Docker Not Working:

	•	Check logs for any issues:

docker-compose logs wdv442-node


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

docker-compose exec wdv442-mysql sh

MySQL Shell:

To interact with the database in MySQL, run this in the MySQL container:

mysql -u asl -p

Enter the MySQL password (asl) when prompted.

📝 Detailed Implementation of Requirements

1. Support for CRUD Methods in Both HTML and JSON

Where and Why:

	•	Files:
	•	Controllers: controllers/planet.js, controllers/star.js, controllers/galaxy.js
	•	Reason:
	•	Controllers are the logical place to handle different response types based on the request headers since they process the incoming requests and decide on the response.

Implementation Details:

	•	Example from controllers/planet.js:

// controllers/planet.js

// Other controller methods...

// Update a planet
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      const { name } = req.body;
      let imagePath = planet.imagePath;

      if (req.file) {
        imagePath = `uploads/planets/${req.file.filename}`;
      }

      await planet.update({ name, imagePath });

      if (req.accepts('html')) {
        res.redirect(`/planets/${planet.id}`);
      } else if (req.accepts('json')) {
        res.status(200).json(planet);
      } else {
        res.status(406).send('Not Acceptable');
      }
    } else {
      if (req.accepts('html')) {
        res.status(404).render('error', { error: 'Planet not found' });
      } else if (req.accepts('json')) {
        res.status(404).json({ error: 'Planet not found' });
      } else {
        res.status(406).send('Not Acceptable');
      }
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};


	•	Key Points:
	•	Content Negotiation: The controller checks the Accept header to determine whether to send an HTML or JSON response.
	•	Status Codes: Proper HTTP status codes are used for different scenarios (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).
	•	Redirection: In HTML responses, redirects are used to navigate the user to the appropriate page after an operation.

2. Image Upload Capability for REST Resources

Where and Why:

	•	Files:
	•	Middleware: middlewares/upload.js
	•	Controllers: controllers/planet.js, controllers/star.js, controllers/galaxy.js
	•	Models: models/planet.js, models/star.js, models/galaxy.js
	•	Views: views/planets/*.twig, views/stars/*.twig, views/galaxies/*.twig
	•	Reason:
	•	Middleware: Handles file uploads across different routes; centralized logic.
	•	Controllers: Need to process the uploaded files and save the file paths to the database.
	•	Models: Must include the imagePath field to store the path to the uploaded images.
	•	Views: Display images to users.

Implementation Details:

	•	Middleware (middlewares/upload.js):
	•	Functionality:
	•	Configures multer to store uploaded files in the correct directories.
	•	Generates unique filenames to prevent conflicts.
	•	Models (e.g., models/planet.js):

// models/planet.js

module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Planet;
};

	•	Explanation:
	•	The imagePath field is added to store the path to the uploaded image.

	•	Controllers (e.g., controllers/planet.js):
	•	Handling Image Uploads in Create and Update Methods:

// Create a new planet
const create = async (req, res) => {
  // ... as shown earlier
};

// Update a planet
const update = async (req, res) => {
  // ... as shown earlier
};

	•	Explanation:
	•	Checks if req.file exists to determine if an image was uploaded.
	•	Constructs the imagePath based on the uploaded file.
	•	Saves the imagePath to the database.

	•	Views (e.g., views/planets/show.twig):
	•	Displaying Images:

{% if planet.imagePath %}
  <img src="{{ asset(planet.imagePath) }}" alt="{{ planet.name }}" width="300">
{% endif %}

	•	Explanation:
	•	Uses the custom asset function to generate the correct URL.
	•	Only displays the image if imagePath is present.

3. Basic Styling with CSS

Where and Why:

	•	Files:
	•	CSS File: public/css/style.css
	•	Layout Template: views/layout.twig
	•	Individual Views: views/planets/*.twig, views/stars/*.twig, views/galaxies/*.twig
	•	Reason:
	•	CSS File: Contains all the styling rules.
	•	Layout Template: Links the CSS file and provides a consistent structure.
	•	Individual Views: Build upon the layout and include content-specific HTML.

Implementation Details:

	•	Linking CSS in views/layout.twig:

<link rel="stylesheet" href="{{ asset('css/style.css') }}">


	•	Styling Examples in public/css/style.css:

/* Basic styling for header */
header {
  background-color: #2c3e50;
  color: white;
  padding: 1em;
  text-align: center;
}

/* Navigation menu */
nav a {
  color: white;
  margin: 0 1em;
  text-decoration: none;
}

/* Main content area */
main {
  margin: 2em;
}

/* Form styling */
form label {
  display: block;
  margin-top: 1em;
}

form input[type="text"],
form input[type="file"] {
  width: 100%;
  padding: 0.5em;
}

/* Buttons */
button {
  margin-top: 1em;
  padding: 0.5em 1em;
}


	•	Explanation:
	•	Provides a consistent and professional look and feel.
	•	Enhances usability by improving layout and readability.

4. Usage of Proper Status Codes

Where and Why:

	•	Files:
	•	Controllers: All controller files (controllers/*.js)
	•	Reason:
	•	Controllers handle HTTP requests and are responsible for setting the appropriate status codes in responses.

Implementation Details:

	•	Examples:
	•	200 OK:
	•	Sent when a request has succeeded.
	•	201 Created:

// In create methods
res.status(201).json(resource);

	•	Indicates that a resource has been created successfully.

	•	404 Not Found:

res.status(404).render('error', { error: 'Resource not found' });

	•	Sent when a requested resource does not exist.

	•	500 Internal Server Error:

res.status(500).render('error', { error });

	•	Sent when an unexpected error occurs on the server.

	•	Explanation:
	•	Using the correct status codes helps clients understand the result of their requests and handle responses appropriately.

5. Proper Routing & Redirecting

Where and Why:

	•	Files:
	•	Routers: routers/planet.js, routers/star.js, routers/galaxy.js
	•	Reason:
	•	Routers define the endpoints and HTTP methods for interacting with resources.
	•	Ensures that requests are directed to the correct controller methods.

Implementation Details:

	•	Example from routers/planet.js:

// routers/planet.js

const express = require('express');
const planetCtlr = require('../controllers/planet');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', planetCtlr.index);
router.get('/new', planetCtlr.new);
router.post('/', upload('planets').single('image'), planetCtlr.create);
router.get('/:id', planetCtlr.show);
router.get('/:id/edit', planetCtlr.edit);
router.put('/:id', upload('planets').single('image'), planetCtlr.update);
router.delete('/:id', planetCtlr.remove);

module.exports = router;


	•	Explanation:
	•	Routing:
	•	Defines routes for all CRUD operations.
	•	Uses HTTP verbs (GET, POST, PUT, DELETE) to map to appropriate controller actions.
	•	Redirecting:
	•	After creating or updating a resource, controllers redirect to the resource’s page or respond with JSON as per content negotiation.

6. Independent Research & Troubleshooting

Actions Taken:

	•	Handling File Uploads:
	•	Researched how to use multer for handling multipart/form-data.
	•	Implemented custom storage engines to organize uploads into specific folders.
	•	Content Negotiation:
	•	Learned how Express’s req.accepts() method works to serve different content types.
	•	Custom Twig Functions:
	•	Created the asset function to correctly reference static assets in templates.

// index.js

Twig.extendFunction('asset', function (assetPath) {
  if (!assetPath.startsWith('/')) {
    return '/' + assetPath;
  }
  return assetPath;
});


	•	Troubleshooting:
	•	Used Docker logs and application logs to diagnose issues.
	•	Adjusted database configurations and migrations to resolve schema discrepancies.

🎯 Conclusion

You’ve now set up and run the Star Tracker API, successfully performed CRUD operations using cURL and a web browser, and learned how the application meets specific requirements for content types, image uploads, and styling.

By pointing out where each functionality is implemented and explaining why it’s done in those files, this guide should help you understand the structure and logic of the application.

Happy Coding! ✨

If you have any questions or need further assistance, please feel free to reach out.
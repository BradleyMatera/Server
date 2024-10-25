// index.js

const express = require('express');
const path = require('path');
const Twig = require('twig');
const methodOverride = require('method-override');

// Initialize Express app
const app = express();

// Set up view engine (Twig)
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a custom 'asset' function for Twig
Twig.extendFunction('asset', function (assetPath) {
  // Ensure the asset path starts with a leading slash
  if (!assetPath.startsWith('/')) {
    return '/' + assetPath;
  }
  return assetPath;
});

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for method override (to support PUT and DELETE methods in forms)
app.use(methodOverride('_method'));

// Routers
const planetRouter = require('./routers/planet');
const starRouter = require('./routers/star');
const galaxyRouter = require('./routers/galaxy');

app.use('/planets', planetRouter);
app.use('/stars', starRouter);
app.use('/galaxies', galaxyRouter);

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).render('error', { error: err });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
BEGIN

1. IMPORT necessary modules:
   - express (web framework)
   - path (file path utilities)
   - Twig (templating engine)
   - methodOverride (middleware for HTTP method override)

2. CREATE an Express application instance called 'app'.

3. CONFIGURE the application:
   a. Set the view engine to 'twig'.
   b. Set the views directory to 'views' relative to the current directory.
   c. Serve static files from the 'public' directory.

4. EXTEND Twig with a custom function 'asset':
   - Function takes 'assetPath' as input.
   - If 'assetPath' doesn't start with '/', prepend '/'.
   - Return the adjusted 'assetPath'.

5. ADD middleware to parse incoming request bodies:
   a. Parse JSON payloads.
   b. Parse URL-encoded payloads (form data).

6. ADD method override middleware to support PUT and DELETE methods via '_method' parameter.

7. IMPORT routers for planets, stars, and galaxies.

8. MOUNT the routers:
   a. '/planets' routes are handled by 'planetRouter'.
   b. '/stars' routes are handled by 'starRouter'.
   c. '/galaxies' routes are handled by 'galaxyRouter'.

9. DEFINE the home route ('/'):
   - On GET request to '/', render the 'home' template.

10. ADD error-handling middleware:
    - On error, render the 'error' template with the error information.

11. START the server:
    - Determine PORT (environment variable 'PORT' or default to 3000).
    - Listen on PORT.
    - On server start, log 'Server running on port PORT'.

END
*/
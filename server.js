const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contactsRouter');
const morgan = require('morgan');
require('dotenv').config();

// Create the Express app
const app = express();

// Use morgan to log all requests
app.use(morgan('dev'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/v1/contacts', contactsRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the Contact Book API');
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
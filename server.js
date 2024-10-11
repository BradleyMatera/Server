const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contactsRouter'); // Ensure the correct path

const app = express();

// Enable CORS with specific allowed methods and headers
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Filter-By', 'X-Filter-Operator', 'X-Filter-Value']
}));

// Middleware for JSON parsing
app.use(express.json());

// Route to handle contacts
app.use('/v1/contacts', contactsRouter);

// MongoDB connection setup
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://mongodb:27017/contactbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
}).then(() => {
  console.log('MongoDB connected successfully at 127.0.0.1:27017');
}).catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1); // Exit process if MongoDB connection fails
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Global error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});
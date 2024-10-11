const mongoose = require('mongoose');
const ContactModel = require('../models/contactModel'); // Adjust if needed

// Sample contact data for seeding
const contacts = [
  {
    fname: 'John',
    lname: 'Doe',
    email: 'johndoe@example.com',
    phone: '360-555-1234',
    birthday: '1985-05-15'
  },
  {
    fname: 'Jane',
    lname: 'Smith',
    email: 'janesmith@example.com',
    phone: '360-555-5678',
    birthday: '1990-10-25'
  },
  {
    fname: 'Bob',
    lname: 'Johnson',
    email: 'bobjohnson@example.com',
    phone: '360-555-8765',
    birthday: '1978-01-09'
  }
];

// Set mongoose strictQuery option
mongoose.set('strictQuery', false);

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");

    // Connect to MongoDB (use service name 'mongodb' in Docker Compose)
    await mongoose.connect('mongodb://mongodb:27017/contactbook', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully!");

    // Clear the existing data
    console.log("Clearing existing contacts...");
    await ContactModel.deleteMany({});
    console.log("Existing contacts cleared.");

    // Insert new contacts
    console.log("Seeding new contact data...");
    await ContactModel.insertMany(contacts);
    console.log("Database seeded successfully with new contact data!");

    // Close the database connection after seeding
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
    process.exit(1); // Ensure the script exits on error
  }
}

// Run the seed function
seedDatabase();
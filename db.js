const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
// const mongoURL_local = process.env.MONGODB_URL_LOCAL; // replace mydb with your database name
const mongoURL = process.env.MONGODB_URL;


// Set up a connection to the database
mongoose.connect(mongoURL, { 
  // useNewUrlParser: true, 
  // useUnifiedTopology: true 
});

// store the default connection object in a variable
const db = mongoose.connection;

// Event listeners for the connection object
db.on('connected', () => {
  console.log('Mongoose is connected');
});

db.on('error', (error) => {
  console.log('Mongoose connection error: ', error);
});

db.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

// Export the connection
module.exports = db;
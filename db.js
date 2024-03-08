const mongoose = require('mongoose');

// Connect to MongoDB
const mongoURL = 'mongodb://0.0.0.0:27017/mydb'; // replace mydb with your database name

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
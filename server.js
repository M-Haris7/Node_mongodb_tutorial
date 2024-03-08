const express = require('express');
const app = express(); // a blue print of express is stored in app
const db = require('./db'); // importing the db.js file
require('dotenv').config(); // to use the .env file

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to parse the incoming request body


app.get('/', (req, res) => {
  res.send('Hello World');
}); // get request to the root of the server




// import the route files
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// use the routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


const PORT = process.env.PORT || 3000; // to use the port from the .env file other use Port 3000

app.listen(PORT, () => {
  console.log("server is listening on port 3000");
});
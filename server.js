const express = require('express');
const app = express(); // a blue print of express is stored in app
const db = require('./db'); 
require('dotenv').config(); 
const passport = require('./auth');


const PORT = process.env.PORT || 3000; // to use the port from the .env file other use Port 3000


const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to parse the incoming request body


// Middleware function to log request protocol
const logReqquest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalURL}`);
  next();
};
app.use(logReqquest); // use the middleware function at all routes




app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', (req, res) => {
  res.send('Hello World');
}); // get request to the root of the server


// import the route files
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// use the routes
app.use('/users', localAuthMiddleware, userRoutes);
app.use('/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log("server is listening on port 3000");
});
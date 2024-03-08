const express = require('express');
const router = express.Router();
const User = require('./../models/users'); // importing the user model

// post request to create a new user
router.post('/', async (req, res) => {
  try {
    const data = req.body; // data from the request body

  // create a new user
  const newUser = new User(data);

  //save the user to the database
  const response = await newUser.save();
  console.log('Data saved!');
  res.status(201).json(response);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// get request to get all the users
router.get('/', async (req, res) => {
  try {
    const data = await User.find();
    console.log('data fetched');
    res.status(200).json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// get users by workType
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if(workType == 'developer' || workType == 'designer' || workType == 'manager' || workType == 'other') {
      const data = await User.find({work: workType});
      console.log('data fetched');
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error: 'workType not found'});
    }
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// update user by id
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; 
    const updatedPersonData = req.body;
    
    const updatedPerson = await User.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true
    });

    if(!updatedPerson){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('User updated!');
    res.json(updatedPerson);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}); 

// delete user by id
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; 
    const deletedPerson = await User.findByIdAndDelete(personId);

    if(!deletedPerson){
      return res.status(404).json({error: 'Person not found'});
    }

      console.log('User deleted!');
    res.json(deletedPerson);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


module.exports = router;
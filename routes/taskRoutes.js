const express = require('express');
const router = express.Router();
const Task = require('./../models/tasks'); // importing the task model

// post request to create a new task
router.post('/', async(req, res) => {
  try {
    const data = req.body;

    const newTask = new Task(data);

    const response = await newTask.save();
    console.log('Data saved!');
    res.status(201).json(response);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// get request to get a tasks
router.get('/', async(req, res) => {
  try {
    const data = await Task.find();
    console.log('data fetched');
    res.status(200).json(data);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//get task by tool used
router.get('/:toolUsed', async(req, res) => {
  try {
    const toolUsed = req.params.toolUsed;
    if(toolUsed == 'node' || toolUsed == 'figma' || toolUsed == 'mongo' || toolUsed == 'react' || toolUsed == 'mysql' || toolUsed == 'aws' || toolUsed == 'other') {
      const data = await Task.find({toolUsed: toolUsed});
      console.log('data fetched');
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error: 'toolUsed not found'});
    }
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
const mongoose = require('mongoose');

// Define the schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  toolUsed: {
    type: String,
    enum: ['node', 'figma', 'mongo', 'react', 'mysql', 'aws', 'other']
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
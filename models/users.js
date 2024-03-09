const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum: ['developer', 'designer', 'manager', 'other'],
    required: true
  },
  mobile: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


// pre save hook to hash the password before saving the user to the database
userSchema.pre('save', async function(next) {
  const user = this;

  //Hash the password only if it has been modified or is new
  if(!user.isModified('password')) 
    return next();

  try {
    const salt = await bcrypt.genSalt(10); // generate a random salt of length 10
    const hashedPassword = await bcrypt.hash(user.password, salt); // hash the password with the salt
    user.password = hashedPassword; // set the password to the hashed password
  } 
  catch (error) {
    return next(error);
  }
});    

// method to compare the password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch ;
  } 
  catch (error) {
    throw error;
  }
};

// Create user model
const User = mongoose.model('User', userSchema);
module.exports = User;
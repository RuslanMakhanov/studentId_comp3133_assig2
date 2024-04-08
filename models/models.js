const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
// Compile and export the User model
const User = mongoose.model('User', userSchema);

const employeeSchema = new mongoose.Schema({
first_name: { type: String, required: true },
last_name: { type: String, required: true },
email: { type: String, required: true, unique: true },
gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
salary: { type: Number, required: true },
});

// Compile and export the Employee model
const Employee = mongoose.model('Employee', employeeSchema);
  
module.exports = {
    User,
    Employee
  };
  
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {

  },
  full_name: {
    type: String,
  }

}, { timestamps: true });



const User = mongoose.model('User', userSchema);


module.exports = User;
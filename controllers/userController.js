const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');




module.exports.userSignUp = async (req, res) => {

  const { email, password, full_name } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        password: hashedPassword,
        full_name
      });
      const savedUser = await newUser.save();
      const token = await jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY);
      return res.status(201).json({
        username: savedUser.full_name,
        email: savedUser.email,
        token,
        id: savedUser._id
      });

    }

  } catch (err) {
    return res.status(400).json({
      message: err.message
    });

  }

}



module.exports.userLogin = async (req, res) => {

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isValidPassword = await bcrypt.compareSync(password, existingUser.password);
      if (!isValidPassword) {
        return res.status(422).json({
          message: 'Invalid Credentials'
        });
      } else {
        const token = jwt.sign({
          userId: existingUser._id,
          email: existingUser.email
        },
          process.env.SECRET_KEY);

        return res.status(200).json({
          message: 'User logged in',
          token,
          email: existingUser.email,
          username: existingUser.full_name,
          id: existingUser._id,
        });
      }

    } else {
      return res.status(401).json(
        { status: 'Check your Credentials' });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }


}
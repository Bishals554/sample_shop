const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  full_name: Joi.string().min(6).max(20).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });


router.route('/api/userSignUp').post(validator.body(registerSchema), userController.userSignUp).all(methodNotAllowed);

router.route('/api/userLogin').post(validator.body(loginSchema), userController.userLogin).all(methodNotAllowed);





module.exports = router;
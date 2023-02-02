const express = require('express');
const productController = require('../controllers/productController');
const status = require('../middleware/checkAuth');
const path = require('path');
const router = express.Router();
const Product = require('../models/Product');
const fileUpload = require('../middleware/file-upload');
const HttpError = require('../models/error');

const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });


router.route('/').get(productController.getProducts).all(methodNotAllowed);



const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const productSchema = joi.object().keys({
  product_name: joi.string().min(6).max(40).required(),
  product_detail: joi.string().min(6).max(140).required(),
  product_price: joi.number().max(100).required(),
  image: joi.string().required(),
});


// router.route('/api/create_products').post(status.checkAuth, fileUpload.single('image'), productController.addProduct).all(methodNotAllowed);


router.route('/api/create_products').post(status.checkAuth, productController.addProduct).all(methodNotAllowed);

router.route('/product/:id').get(productController.product_details).all(methodNotAllowed);

router.route('/product/update/:id').patch(status.checkAuth, productController.updateProduct).all(methodNotAllowed);


// router.route('/product/update/:id').patch(status.checkAuth, fileUpload.single('image'), productController.updateProduct).all(methodNotAllowed);

router.route('/products/remove/:id').delete(status.checkAuth, productController.removeProduct).all(methodNotAllowed);








module.exports = router;



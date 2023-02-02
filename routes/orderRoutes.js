const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/checkAuth');

const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });



router.route('/order/history/:id').get(orderController.getOrderHistory).all(methodNotAllowed);
router.route('/order/order_create').post(auth.checkAuth, orderController.addOrder).all(methodNotAllowed);





module.exports = router;
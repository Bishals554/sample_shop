const Order = require('../models/Order')





module.exports.getOrderHistory = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }

}


module.exports.addOrder = async (req, res) => {

  const { amount, dateTime, products, userId } = req.body;

  try {
    const order = new Order({
      amount,
      dateTime,
      products,
      userId
    });

    await order.save();
    res.status(201).send({
      message: 'Order created',
      order
    });
  } catch (err) {
    res.status(401).send({
      message: 'you are not authorized'
    });

  }

}
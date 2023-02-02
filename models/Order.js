const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  dateTime: {
    type: String,
  },
  products: {
    type: Array,

  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });





const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
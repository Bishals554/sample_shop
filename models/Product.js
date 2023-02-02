const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

  product_name: {
    type: String,
    required: true,
  },
  product_detail: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },


  // creator: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // }


}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
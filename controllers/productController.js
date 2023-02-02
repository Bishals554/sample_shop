const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2
const fs = require('fs');
require("dotenv").config();

module.exports.getProducts = (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then((products) => {
      res.status(200).json(products);
    });

}

module.exports.addProduct = async (req, res) => {
  const { product_name, product_detail, price, imageUrl, public_id } = req.body;
  try {

    // cloudinary.config({
    //   cloud_name: process.env.CLOUD_NAME,
    //   api_key: process.env.API_KEY,
    //   api_secret: process.env.API_SECRET
    // });

    // const result = await cloudinary.uploader.upload(req.file.path, { upload_preset: "sample_pics" });

    const product = new Product({
      product_name,
      product_detail,
      price,
      image: imageUrl,
      public_id: public_id
    });
    await product.save();
    // if (req.file !== undefined) {
    //   fs.unlink(req.file.path, err => {
    //     // console.log(err);
    //   });
    // }
    return res.status(200).json({ status: 'succesfully added' });
  } catch (err) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });

    const result = await cloudinary.uploader.destroy(public_id);

    // if (req.file !== undefined) {
    //   fs.unlink(req.file.path, err => { 
    //     // console.log(err);
    //   });
    //   return res.status(400).json({ msg: err.message });
    // } else {
    //   return res.status(400).json({ msg: 'image required' });
    // }
    return res.status(400).json({ msg: err.message });
  }
}


module.exports.product_details = (req, res) => {
  module.exports.id = req.params.id;
  Product.findById(id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json('something went wrong');
    });
}

module.exports.updateProduct = async (req, res) => {

  const _id = req.params.id;
  const { photo, product_name, product_detail, price, public_id, oldImageId } = req.body;
  if (photo === 'no need') {
    try {
      await Product.findByIdAndUpdate(_id, {
        product_name,
        product_detail,
        price
      });
      res.status(200).json({ status: 'succesfully updated' });
    } catch (err) {
      res.status(400).json({ msg: 'something went wrong' });
    }


  } else {

    try {

      // const decode = Buffer.from(photo, 'base64');
      // const filePath = `./uploads/images/${uuidv4()}.png`;

      // fs.writeFile(filePath, decode, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });

      cloudinary.config({
        cloud_name: 'dx5eyrlaf',
        api_key: '316226597746222',
        api_secret: 'YbnHayJ00pMZjzCnVFrois70iKc'
      })

      await cloudinary.uploader.destroy(oldImageId);
      // const result = await cloudinary.uploader.upload(
      //   req.file.path, { upload_preset: "sample_pics" });

      await Product.findByIdAndUpdate(_id, {
        product_name,
        product_detail,
        price,
        public_id: public_id,
        image: photo,
      });
      // if (req.file !== undefined) {
      //   fs.unlink(req.file.path, err => {
      //     // console.log(err);
      //   });
      // }
      res.status(200).json({ status: 'succesfully updated' });

    } catch (err) {
      res.status(400).json({ msg: 'something went wrong' });
    }



  }


}




module.exports.removeProduct = async (req, res) => {
  const id = req.params.id;
  const { public_id } = req.body;
  try {
    await Product.findByIdAndDelete(id);
    cloudinary.config({
      cloud_name: 'dx5eyrlaf',
      api_key: '316226597746222',
      api_secret: 'YbnHayJ00pMZjzCnVFrois70iKc'
    })

    await cloudinary.uploader.destroy(public_id);

    res.status(200).json({ status: 'succesfully deleted' });


  } catch (err) {
    res.status(400).json({ msg: 'something went wrong' });

  }

}














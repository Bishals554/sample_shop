require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();
const poductRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');


mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  app.listen(port);
});

//const path = require('path');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, multipart/form-data');
  next();
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads/images', express.static(path.join('uploads', 'images',)));


app.use(orderRoutes);
app.use(poductRoutes)
app.use(userRoutes);
















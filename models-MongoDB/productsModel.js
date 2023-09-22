const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  type: String,
  dateEntry: {
    type: Date,
    default: Date.now,
  },
});


exports.Product = mongoose.model('products', productsSchema);

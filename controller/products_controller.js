const { Product } = require('../models-MongoDB/productsModel');

module.exports = { getProducts: async (req, res, next) => {
    const products = await Product.find()
    res.json(products)
  }
}
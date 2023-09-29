const { Product } = require('../models-MongoDB/productsModel');

module.exports = { getProducts: async (req, resp, next) => {
    const products = await Product.find()
    return resp.json(products)
  }
}
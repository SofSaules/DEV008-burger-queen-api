const { Order } = require('../models-MongoDB/ordersModel');

module.exports = { getOrders: async (req, resp, next) => {
    const orders = await Order.find()
    return resp.json(orders)
  }
}
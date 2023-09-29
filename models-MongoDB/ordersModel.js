const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  products:
        {
          type: Array,
          required: true,
          ref: 'Product List',
          value: [
            {
              qty: {
                type: Number,
                ref: 'Product amount',
                required: true,
              },
              product: {
                id: {
                  type: String,
                  required: true,
                },
                name: {
                  type: String,
                  required: true,
                },
                price: {
                  type: Number,
                  required: true,
                },
                image: {
                  type: String,
                  required: true,
                },
                type: {
                  type: String,
                  enum: ['Desayuno', 'Almuerzo'],
                  required: true,
                },
                dateEntry: {
                  type: String,
                  required: true,
                },
              },
            },
          ],
        },
  status: {
    type: String,
    enum: ['En preparación', 'Listo en barra', 'Entregado', 'Cancelado'],
  },
  dateEntry: {
    type: Date,
    default: Date.now,
  },
});

exports.Order = mongoose.model('orders', ordersSchema);

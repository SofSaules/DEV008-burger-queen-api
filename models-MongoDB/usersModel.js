const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    admin: Boolean,
  },
});

exports.User = mongoose.model('users', userSchema);

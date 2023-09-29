const { User } = require('../models-MongoDB/usersModel');


module.exports = { 
  getUsers: async (req, resp, next) => {
    const users = await User.find()
    return resp.json(users)
  },
};
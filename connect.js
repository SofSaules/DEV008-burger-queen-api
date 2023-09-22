const mongoose = require('mongoose');
const config = require('./config');

// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;

async function connect() {
  try {
    await mongoose.connect(dbUrl,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
console.log('---Connected to database MongoDB');
return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to database MongoDB', error);
    throw error;
  }
}

module.exports = { connect };


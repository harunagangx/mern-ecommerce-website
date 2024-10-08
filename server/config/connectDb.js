const mongoose = require('mongoose');

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('connected to database...');
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDb;

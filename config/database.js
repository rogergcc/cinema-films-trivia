const mongoose = require('mongoose');
const CONFIG = require('./config');
const colors = require('colors');
// const options = {
//     keepAlive: 1,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };

const DBconnection = async () => {
    const conn = await mongoose
      .connect(CONFIG.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .catch(err => {
        console.log(`For some reasons we couldn't connect to the DB`.red, err)
      })
  
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
  }
  
  module.exports = DBconnection
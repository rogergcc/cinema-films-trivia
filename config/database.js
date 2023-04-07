const mongoose = require('mongoose')
const CONFIG = require('./config')
const colors = require('colors')
// const options = {
//     keepAlive: 1,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };
const DBconnection = async () => {
  try {
    const conn = await mongoose.connect(CONFIG.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    if (conn) {
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } else {
      console.log('Failed to connect to MongoDB'.red)
    }
  } catch (error) {
    console.log('Error connecting to MongoDB'.red, error)
  }
}

module.exports = DBconnection

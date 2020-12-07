const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({  })

const Player = require('./app/models/playerLeaderboardModel')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const player = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/players.json`, 'utf-8')
)

const importData = async () => {
  try {
    await Player.create(player)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

const deleteData = async () => {
  try {
    await Player.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  // node seeder -i
  importData()
} else if (process.argv[2] === '-d') {
  // node seeder -d
  deleteData()
}
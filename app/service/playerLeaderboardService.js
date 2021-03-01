const PlayerLeaderboard = require('../models/playerLeaderboardModel')
const { formatMongoData, checkObjectId } = require('../helper/dbHelper')
const constants = require('../constants')

module.exports.createPlayer = async (serviceData) => {
  try {
    const player = new PlayerLeaderboard({ ...serviceData })
    const result = await player.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('Something went wrong: Service: createPlayer', error)
    throw new Error(error)
  }
}

module.exports.getAllPlayers = async (req) => {
  try {
    let { page = 1, limit = 10 } = req
    page = page <= 0 ? 1 : page

    const player = await PlayerLeaderboard.paginate({}, { page, sort: { score: -1 } })
    return (player)
  } catch (error) {
    console.log('Something went wrong: Service: getAllPlayers', error)
    throw new Error(error)
  }
}

module.exports.getPlayerById = async ({ id }) => {
  try {
    checkObjectId(id)
    const player = await PlayerLeaderboard.findById(id)
    if (!player) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
    }
    return formatMongoData(player)
  } catch (error) {
    console.log('Something went wrong: Service: getPlayerById', error)
    throw new Error(error)
  }
}

module.exports.updatePlayer = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id)
    const player = await PlayerLeaderboard.findOneAndUpdate(
      { _id: id },
      updateInfo,
      { new: true }
    )
    if (!player) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
    }
    return formatMongoData(player)
  } catch (error) {
    console.log('Something went wrong: Service: updatePlayer', error)
    throw new Error(error)
  }
}
module.exports.checkPlayerAlreadyExisting = async (playerId) => {
  try {
    // checkObjectId(name);
    const alreadyExisting = await PlayerLeaderboard.findOne(
      { playerId }
    )
    // if (!alreadyExisting) {
    //   throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    // }

    return alreadyExisting
  } catch (error) {
    console.log('Something went wrong: Service: check produdct exist', error)
    throw new Error(error)
  }
}

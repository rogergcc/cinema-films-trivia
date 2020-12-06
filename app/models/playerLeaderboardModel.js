const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const playerLeaderboardSchema = new mongoose.Schema({
  playerId: String,
  username: String,
  score: Number
}, {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

  playerLeaderboardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PlayerLeaderboard', playerLeaderboardSchema);
// models/TopAlbum.js
const mongoose = require('mongoose');

const LikedSongSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  songId:{
    type:String,
    required:true,
  }
});

module.exports = mongoose.model('LikedSongs', LikedSongSchema);

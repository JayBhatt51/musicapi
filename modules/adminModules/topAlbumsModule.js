// models/TopAlbum.js
const mongoose = require('mongoose');

const TopAlbumSchema = new mongoose.Schema({
  top_albums: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TopAlbum', TopAlbumSchema);

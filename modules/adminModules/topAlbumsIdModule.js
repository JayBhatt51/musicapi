// models/TopAlbum.js
const mongoose = require('mongoose');

const TopAlbumIDsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TopAlbumIDs', TopAlbumIDsSchema);

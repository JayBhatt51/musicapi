// models/Playlist.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [{ type: String }] // Assuming song IDs are strings, adjust if different
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;

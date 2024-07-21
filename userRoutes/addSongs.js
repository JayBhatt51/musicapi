const express = require('express');
const router = express.Router();
const Playlist = require('../modules/userModules/playlistModel');

router.post('/', async (req, res) => {
    const { playlistId,songId } = req.body;
  
    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      playlist.songs.push(songId);
      await playlist.save();
  
      res.status(200).json({ message: 'Song added to playlist', playlist });
    } catch (error) {
      res.status(500).json({ message: 'Error adding song to playlist', error });
    }
  });
  
  module.exports = router;
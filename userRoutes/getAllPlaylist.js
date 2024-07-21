const express = require('express');
const router = express.Router();
const Playlist = require('../modules/userModules/playlistModel');

router.post('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const playlists = await Playlist.find({ userId }).select('name');
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
});

module.exports = router;

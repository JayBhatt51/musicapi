// routes/playlists.js
const express = require('express');
const router = express.Router();
const Playlist = require('../modules/userModules/playlistModel');
const User = require('../modules/userModules/userModel');

// Create a new playlist
router.post('/', async (req, res) => {
  const { name, username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPlaylist = new Playlist({ name, userId: user._id });
    await newPlaylist.save();

    res.status(201).json({ message: 'Playlist created successfully', playlist: newPlaylist });
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist', error });
  }
});

module.exports = router;

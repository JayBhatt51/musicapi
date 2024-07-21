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

    const playlist = await Playlist.findOne({ name, userId: user._id });
    if (playlist) {
        await Playlist.deleteOne({ name, userId: user._id });
        return res.status(200).json({ message: 'Removed Playlist Sucessfully', status: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
});

module.exports = router;

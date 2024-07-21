const express = require('express');
const router = express.Router();
const Playlist = require('../modules/userModules/playlistModel');

router.post('/:playlistId/songs/:songId', async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Filter out the song to be deleted from the playlist.songs array
    const updatedSongs = playlist.songs.filter((currentSongId) => currentSongId.toString() !== songId);

    playlist.songs = updatedSongs;
    await playlist.save();

    res.status(200).json({ message: 'Song deleted from playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song from playlist', error });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const LikedSongs = require("../modules/userModules/likedSongs");

router.post('/', async (req, res) => {
    const { username, songId } = req.body;

    try {
        // Check if the song is already liked by the user
        const existingSong = await LikedSongs.findOne({ username: username, songId: songId });

        if (existingSong) {
            await LikedSongs.deleteOne({ username: username, songId: songId });
            return res.status(200).json({ message: 'Removed from liked songs', status: true });
        }

        // Create a new liked song entry
        const newLikedSong = new LikedSongs({
            username,
            songId
        });

        // Save the new liked song to the database
        await newLikedSong.save();

        // Respond with a success message
        res.status(200).json({ message: 'Added to liked songs successfully', status: true });
    } catch (error) {
        // Handle any other errors
        console.error('Error occurred:', error.message);
        res.status(500).json({ message: 'Error occurred', error });
    }
});

module.exports = router;

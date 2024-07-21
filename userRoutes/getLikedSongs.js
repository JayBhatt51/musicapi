const express = require('express');
const axios = require('axios').default;
const router = express.Router();
const LikedSongs = require("../modules/userModules/likedSongs");
require('dotenv').config();
router.post('/', async (req, res) => {
    const { username} = req.body;

    try {
        // Check if the song is already liked by the user
        const existingSong = await LikedSongs.find({username});
        if (!existingSong) {
            return res.status(200).json({ message: 'No Liked Songs exist', status: true });
        }
        let likedSongsArray = [];
        for(let i=0;i<existingSong.length;i++){
            const options = {method: 'GET', url: `${process.env.SONGS_BY_ID}/${existingSong[i].songId}`};
            try {
            const { data } = await axios.request(options);
            likedSongsArray.push(data);
            } catch (error) {
            console.error(error);
            }
        }
        res.status(200).json(likedSongsArray);
    } catch (error) {
        // Handle any other errors
        console.error('Error occurred:', error.message);
        res.status(500).json({ message: 'Error occurred', error });
    }
});

module.exports = router;

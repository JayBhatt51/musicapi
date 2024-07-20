const express = require('express');
const router = express.Router();
const TopAlbum = require('../modules/adminModules/topAlbumsModule');
require('dotenv').config();

const url = 'https://billboard2.p.rapidapi.com/billboard_global_200?date=2024-07-19';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'billboard2.p.rapidapi.com'
  }
};

// Add a new top album
router.post('/', async (req, res) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Log the entire response for debugging
    console.log('API Response:', result);

    // Ensure result is an array
    if (!Array.isArray(result)) {
      throw new Error('API response is not an array');
    }

    // Extract artists' names
    const artists = result.map(album => ({
      top_albums: album.artist,
    }));

    for (const artist of artists.slice(0, 10)) {
      const newTopAlbum = new TopAlbum(artist);
      await newTopAlbum.save();
    }

    res.status(201).json({ status: true });
  } catch (error) {
    console.error('Error adding top album:', error.message); // Log error message
    console.error(error.stack); // Log error stack for more details
    res.status(500).json({ message: 'Error adding top album', error });
  }
});

module.exports = router;

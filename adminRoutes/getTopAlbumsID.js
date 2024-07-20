const express = require('express');
const router = express.Router();
require('dotenv').config();
const TopAlbum = require('../modules/adminModules/topAlbumsModule');
const TopAlbumIDs = require('../modules/adminModules/topAlbumsIdModule')
const axios = require('axios').default;

// Add a new top album
router.post('/', async (req, res) => {
  try {
    const allTopAlbums = await TopAlbum.find({}, 'top_albums');
    const topAlbumNames = allTopAlbums.map(album => album.top_albums);
    const idsArray = [];

    for (let i = 0; i < topAlbumNames.length; i++) {
      const options = {
        method: 'GET',
        url: process.env.TOP_ALBUMS_URL,
        params: { query: topAlbumNames[i] }
      };

      try {
        const response = await axios.request(options);
        const result = response.data; // No need for await response.json() with axios
        const ids = result.data.results
          .slice(0, 2) // Get only the first 2 items
          .map(item => item.id);
        idsArray.push(...ids); // Collect all ids
      } catch (error) {
        console.error(`Error fetching data for album ${topAlbumNames[i]}:`, error.message);
        // Log error but do not send response here
      }
    }
    const topAlbumsIdToInsert = idsArray.map(id => ({ id : id }));

    // Insert multiple documents into the collection
    await TopAlbumIDs.insertMany(topAlbumsIdToInsert);
    // Send response after loop
    res.status(201).json({ status: true, ids: idsArray });
  } catch (error) {
    console.error('Error processing top albums:', error.message);
    res.status(500).json({ message: 'Error processing top albums', error });
  }
});

module.exports = router;

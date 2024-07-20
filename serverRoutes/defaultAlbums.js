const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const TopAlbumIDs = require('../modules/adminModules/topAlbumsIdModule');
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const allTopAlbumsId = await TopAlbumIDs.find({}, 'id');
    const topAlbumId = allTopAlbumsId.map(album => album.id);
    console.log(topAlbumId)
    const topAlbumArray = [];
        for (let i = 0; i < topAlbumId.length; i++) {
          const options = {
            method: 'GET',
            url: process.env.TOP_ALBUMS_DEFAULT,
            params: { id: topAlbumId[i] }
          };
          try {
            const { data } = await axios.request(options);
            topAlbumArray.push(data)
          } catch (error) {
            console.error(error);
          }
        }
        res.status(201).send(topAlbumArray);
      } catch (error) {
        console.error('Error processing top albums:', error.message);
        res.status(500).json({ message: 'Error processing top albums', error });
      }
  });

  module.exports = router;
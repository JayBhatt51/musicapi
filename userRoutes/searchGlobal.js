const express = require('express');
const router = express.Router();
const axios = require('axios').default;
require('dotenv').config();

router.post('/', async (req, res) => {
    const { query } = req.body;
    try {
        const options = {
            method: 'GET',
            url: process.env.GLOBAL_SEARCH,
            params: {query: query}
          };
          
          try {
            const { data } = await axios.request(options);
            res.status(200).json(data);
          } catch (error) {
            console.error(error);
          }
    } catch (error) {
        // Handle any other errors
        console.error('Error during Searching:', error.message);
        res.status(500).json({ message: 'Error during login', error });
    }
});

module.exports = router;
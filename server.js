// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./modules/db');
const app = express();
const topAlbumsRoute = require('./adminRoutes/topAlbums');
const getTopAlbumIDs = require('./adminRoutes/getTopAlbumsID')
const defaultAlbums = require('./serverRoutes/defaultAlbums')
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// for admin to fetch weekly top albums 
// admin routes
app.use('/api/topAlbums', topAlbumsRoute);
app.use('/api/gettopalbumsids',getTopAlbumIDs);


//server routes
app.use('/api/defaultAlbums',defaultAlbums)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

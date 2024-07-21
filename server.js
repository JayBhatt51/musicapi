// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./modules/db');
const app = express();
const topAlbumsRoute = require('./adminRoutes/topAlbums');
const getTopAlbumIDs = require('./adminRoutes/getTopAlbumsID')
const defaultAlbums = require('./serverRoutes/defaultAlbums')
const loginRoutes = require('./userRoutes/loginRoutes')
const signupRoutes = require('./userRoutes/signupRoutes')
const searchGlobal = require("./userRoutes/searchGlobal") 
const setLikedSongs = require("./userRoutes/setLikedSongs")
const getLikedSongs = require("./userRoutes/getLikedSongs")
const createPlaylist = require('./userRoutes/createPlaylist')
const addSongs = require('./userRoutes/addSongs')
const getAllPlaylist = require('./userRoutes/getAllPlaylist')
const removePlaylist = require('./userRoutes/removePlaylist')
const removeSongs = require('./userRoutes/removeSongs') 
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


// user routes
app.use('/api/login',loginRoutes);
app.use('/api/signup',signupRoutes);
app.use('/api/search',searchGlobal);
app.use('/api/setLikedSongs',setLikedSongs);
app.use('/api/getLikedSongs',getLikedSongs);
app.use('/api/createPlaylist',createPlaylist);
app.use('/api/addSongs',addSongs);
app.use('/api/getAllPlaylist',getAllPlaylist);
app.use('/api/removePlaylist',removePlaylist);
app.use('/api/removeSongs',removeSongs);
//server routes
app.use('/api/defaultAlbums',defaultAlbums)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

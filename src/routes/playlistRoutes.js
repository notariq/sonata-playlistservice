const express = require('express');
const playlistController = require('../controllers/playlistControllers');
const router = express.Router();

router.get('/playlist', playlistController.getAllPlaylist);
router.get('/playlist/:id', playlistController.getPlaylistById);
router.post('/playlist', playlistController.createPlaylist);
router.put('/playlist/:id', playlistController.updatePlaylist);
router.delete('/playlist/:id', playlistController.deletePlaylist);
router.post('/playlist-add', playlistController.addSongToPlaylist);

module.exports = router;
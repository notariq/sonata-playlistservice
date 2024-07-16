const mongoose =  require('mongoose');

const playlistSchema = new mongoose.Schema({
  playlistName: { type: String, required: true },
  createdBy: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;

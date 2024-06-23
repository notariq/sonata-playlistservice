const mongoose =  require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
  albumTitle: { type: String, required: true, trim: true },
  albumArtist: { type: String, required: true, trim: true },
  albumDate: { type: Date, required: true, default: Date.now }
});

const musicSchema = new Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  album: [albumSchema],
  date: { type: Date, required: true, default: Date.now },
  duration: { type: Number, required: true },
  location: { type: String, required: true, trim: true }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;

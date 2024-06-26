const Playlist = require('../models/playlist');

exports.getAllPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.find();
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPlaylist = async (req, res) => {
    const playlist = new Playlist(req.body);
    try {
        const savedPlaylist = await playlist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rabbitmq = require('../rabbitmq');
const Playlist = require('../models/playlist');

exports.getPlaylist = async (req, res) => {
    try {
        const createdBy = req.user.user.username;
    
        let query = {};
        if (createdBy) {
            query.createdBy = createdBy;
        }
        const playlists = await Playlist.find(query);
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlaylistAll = async (req, res) => {
    try {    
        const playlists = await Playlist.find({createdBy: "sonata"});
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserPlaylist = async (req, res) => {
    try {
        const { createdBy } = req.query;
        let query = {};
        if (createdBy) {
            query.createdBy = createdBy;
        }
        const playlists = await Playlist.find(query);
        res.status(200).json(playlists);
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
    try {
        const { playlistName, songs } = req.body;
        const createdBy = req.user.user.username;
 
        const playlist = new Playlist({
            playlistName,
            createdBy,
            songs
        });

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

exports.addMusicToPlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { musicId } = req.body;

    try {      
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        if (playlist.songs.includes(musicId)) {
            return res.status(400).json({ error: 'Music already exists in playlist' });
        }
        playlist.songs.push(musicId);
        await playlist.save();

        res.status(200).json({ message: 'Music added to playlist successfully' });
    } catch (error) {
        console.error('Error adding music to playlist:', error);
        res.status(500).json({ error: 'Failed to add music to playlist' });
    }
}

exports.removeMusicFromPlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { musicId } = req.body;

    try {      
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        if (!playlist.songs.includes(musicId)) {
            return res.status(400).json({ error: 'Music does not exists in playlist' });
        }
        playlist.songs.pull(musicId);
        await playlist.save();

        res.status(200).json({ message: 'Music removed from playlist successfully' });
    } catch (error) {
        console.error('Error removing music to playlist:', error);
        res.status(500).json({ error: 'Failed to remove music from playlist' });
    }
}

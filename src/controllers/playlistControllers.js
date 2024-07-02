const Playlist = require('../models/playlist').Playlist;
const Favorite = require('../models/playlist').Favorite;
const rabbitmq = require('../rabbitmq');

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

/*

// Initialize RabbitMQ connection
rabbitmq.initializeRabbitMQ()
  .then(() => {
    // Start consuming messages
    consumeUserEvents();
  })
  .catch((error) => {
    console.error('Error initializing RabbitMQ:', error);
    process.exit(1); // Handle error appropriately
  });


  
  const consumeUserEvents = () => {
    rabbitmq.consumeQueue('user_events', (message) => {
      if (message.type === 'USER_CREATED') {
        // Extract new user data from message
        const { newUser } = message;
  
        // Create playlist for the new user
        createPlaylistForUser(newUser)
          .then((playlist) => {
            console.log('Playlist created for user:', playlist);
          })
          .catch((error) => {
            console.error('Error creating playlist:', error);
          });
      }
    });
  };
  
  const createPlaylistForUser = async (user) => {
    try {
      // Example logic to create a playlist for the user
      const playlist = await Playlist.create({
        createdBy: user.id,
        playlistName: `${user.username}'s Favorites`
        // Add other fields as necessary
      });
      return playlist;
    } catch (error) {
      throw error;
    }
  };



  exports.sendMetadataRequest = async (musicId) => {
    const requestQueue = 'metadata_request_queue';
    const responseQueue = 'metadata_response_queue';
        
    await channel.assertQueue(responseQueue, { durable: true });
        
    const correlationId = uuidv4();

    channel.consume(responseQueue, (message) => {
        if (message.properties.correlationId === correlationId) {
            const metadata = JSON.parse(message.content.toString());
            console.log(`Received metadata: ${JSON.stringify(metadata)}`);
            channel.ack(message);
        }
    }, { noAck: false });
    
    // Send the metadata request
    channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify({ musicId, correlationId, replyTo: responseQueue })));
    
    console.log(`Sent metadata request for music ID: ${musicId}`);
};

*/
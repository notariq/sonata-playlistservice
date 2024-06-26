const express = require('express');
const mongoose = require('mongoose');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://mongo:27017/sonata-playlist';

app.use(express.json());
app.use('/api', playlistRoutes);

mongoose.connect(DB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

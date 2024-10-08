const express = require('express');
const mongoose = require('mongoose');
const playlistRoutes = require('./routes/playlistRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//prod
//const DB_URI = process.env.DB_URI || "mongodb://mongodb:27017/playlistservice_db";

//dev
//'mongodb://localhost:27017/playlist-sonata';
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/playlist-sonata";

app.use(cors())
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
    }
);


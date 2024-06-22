const express = require('express');
const mongoose = require('mongoose');
const musicRoutes = require('./routes/musicRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/music', musicRoutes);

mongoose.connect("mongodb://localhost:27017/music")
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

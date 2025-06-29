const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const songsFolder = path.join(__dirname, "songs");

// Serve static files from the songs folder
app.use("/songs", express.static(songsFolder));

// Endpoint to list song files
app.get("/song-list", (req, res) => {
  fs.readdir(songsFolder, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading songs folder");
    }
    const mp3Files = files.filter(file => file.endsWith(".mp3"));
    res.json(mp3Files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});

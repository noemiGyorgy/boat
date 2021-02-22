require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const upload = require("./app/config/multer-config.js");
const csvWorker = require("./app/controllers/csv-controller.js");

const port = 5000 || process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  const allowedOrigins = [process.env.SERVER, process.env.STREAMER];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

io.on("connection", (socket) => {
  io.emit("connection", "Connected to the position streamer.");
});

const emitPosition = (position, i, end) => {
  const delay = 1000; // 1000ms = 1s = 1Hz

  setTimeout(() => {
    io.emit("position", position);
    if (i >= end) {
      io.emit("endOfTrack", "The journey is over.");
    }
  }, delay * i);
};

const streamPositions = (positions) => {
  setTimeout(() => {
    let start = Date.now();
    positions.forEach((position, i) =>
      emitPosition({ ...position, start: start }, i, positions.length - 1)
    );
  }, 3000);
};

app.post("/upload", upload.single("csvfile"), (req, res) =>
  csvWorker.uploadFile(req, res, streamPositions)
);

server.listen(port, () => console.log(`Server running on port ${port}`));

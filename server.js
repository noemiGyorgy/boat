const path = require("path");
const http = require("http");
const express = require("express");

const port = 5000 || process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:4000/", "http://localhost:5000/"];
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

let position = "No data to show";

io.on("connection", (socket) => {
  io.emit("connection", "Connected to the position streamer.");
  io.emit("position", position);
});

app.post("/upload", (req, res) => {
  res.send("Your input: " + req.body.userinput);
  position = req.body.userinput;
});

server.listen(port, () => console.log(`Server running on port ${port}`));

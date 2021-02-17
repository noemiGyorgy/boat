const socket = io.connect("http://localhost:5000");

socket.on("connection", (message) => {
  console.log("Upload: " + message);
});

socket.on("position", (position) => {
  console.log(position);
});

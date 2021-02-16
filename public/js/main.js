const socket = io.connect("http://localhost:5000");

socket.on("connection", (message) => {
  console.log("Upload: " + message);
});

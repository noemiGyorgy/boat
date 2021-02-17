const socket = io.connect("http://localhost:5000");

socket.on("connection", (message) => {
  console.log(message);
});

socket.on("position", (position) => {
  console.log(position);
});

socket.on("endOfTrack", (message) => {
  console.log(message);
});

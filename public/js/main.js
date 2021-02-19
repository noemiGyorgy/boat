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

$(".custom-file-input").on("change", function () {
  let fileName = $(this).val().split("\\").pop();
  $(this).next(".custom-file-label").addClass("selected").html(fileName);
});

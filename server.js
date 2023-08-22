//standard template for express and socket.io (reference the code train)
const express = require("express");

const app = express();

const server = app.listen(3000);

app.use(express.static("public"));

const socket = require("socket.io");

const io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log(`new connection: ${socket.id}`);
  socket.on("generateWaves", userNumbers => {
    socket.broadcast.emit("generateWaves", userNumbers);
    console.log("clicked");
  });
}

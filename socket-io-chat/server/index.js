require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    methods: ["GET", "POST"],
  },
});

app.use(express.static("build"));

let users = 0;

io.on("connection", (socket) => {
  console.log("a user connected!");
  users++;
  io.emit("USER_CONNECTED", {
    id: socket.id,
    totalUsers: users,
  });
  socket.on("MESSAGE", (data) => {
    socket.broadcast.emit("MESSAGE", {
      ...data,
      userId: socket.id,
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    users--;
    socket.broadcast.emit("USER_DISCONNECTED", {
      id: socket.id,
      totalUsers: users,
    });
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`listening on *:${process.env.SOCKET_PORT}`);
});

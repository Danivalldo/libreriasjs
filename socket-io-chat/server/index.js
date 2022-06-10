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

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected!");
  users.push(socket);
  socket.broadcast.emit("USER_CONNECTED", {
    id: socket.id,
    totalUsers: users.length,
  });
  socket.emit("UPDATE_TOTAL_USERS", {
    totalUsers: users.length,
  });
  socket.on("MESSAGE", (data) => {
    socket.broadcast.emit("MESSAGE", {
      ...data,
      userId: socket.id,
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    users = users.filter((user) => {
      return user.id !== socket.id;
    });
    socket.broadcast.emit("USER_DISCONNECTED", {
      id: socket.id,
      totalUsers: users.length,
    });
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`listening on *:${process.env.SOCKET_PORT}`);
});

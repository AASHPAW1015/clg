const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = [
  { id: 1, name: "Amit", email: "amit@gmail.com", password: "amit@1123" },
  { id: 2, name: "Sunil", email: "sunil@gmail.com", password: "sunil@1123" },
];

io.on("connection", (socket) => {
  console.log("USer with ID: " + socket.id + " is connected");

  io.emit("users", users);

  socket.on("disconnect", () => {
    console.log("USer with ID: " + socket.id + " is disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

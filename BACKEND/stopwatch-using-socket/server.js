const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;

function start() {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
      io.emit("timer", { hours, minutes, seconds });
    }, 1000);
  }
}

function stop() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  stop();
  hours = 0;
  minutes = 0;
  seconds = 0;
  io.emit("timer", { hours, minutes, seconds });
}

io.on("connection", (socket) => {
  console.log("User with ID: " + socket.id + " is connected...");

  io.emit("timer", { hours, minutes, seconds });

  socket.on("timerStart", start);
  socket.on("timerStop", stop);
  socket.on("timerReset", reset);

  io.emit("timer", { hours, minutes, seconds });
  socket.on("disconnect", () => {
    console.log("User with ID: " + socket.id + " is disconnected...");
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

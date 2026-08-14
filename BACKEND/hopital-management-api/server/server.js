const express = require("express");
const db = require("./config/db");
const passport = require("./config/passport");
const authRouter = require("./router/authThang");

const app = express();

app.use(express.json());

app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  next();
});

app.use(passport.initialize());

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Hospital APIs" });
});

app.use("/", authRouter);

app.listen(4000, () => {
  console.log("server is running on port 4000!!");
});

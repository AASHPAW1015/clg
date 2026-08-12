const express = require("express");
const db = require("./config/db");
const userRouter = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use("/user", userRouter);

app.listen(4000, () => {
  console.log("server is running on port 4000!!");
});

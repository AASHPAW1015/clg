const express = require("express");
const employeeRouter = require("./router/employeeRouter");
const db = require("./config/db");
const userRouter = require("./router/userRouter");

const app = express();
app.use(express.json());
app.use("/employees", employeeRouter);
app.use("/users", userRouter);

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});

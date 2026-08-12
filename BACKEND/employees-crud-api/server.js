require("dotenv").config();

const express = require("express");
const employeeRouter = require("./router/employeerouter");
const db = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/employee", employeeRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

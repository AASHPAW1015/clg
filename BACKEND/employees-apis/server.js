require("dotenv").config();

const express = require("express");
const db = require("./config/db");
const employeeRouter = require("./router/employeeRouter");
const cors = require("cors");

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/employees", employeeRouter);

const PORT = process.env.PORT || 4000;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

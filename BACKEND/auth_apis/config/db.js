const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/itm_auth_apis");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("database connected successfully!!!!");
});

db.on("disconnected", () => {
  console.log("database disconnected!!!!");
});

db.on("error", (error) => {
  console.log("database connection error!!!!", error);
});

module.exports = db;

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Add it to your .env file.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`MongoDB connected: ${db.name}`);
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;

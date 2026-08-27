// dotenv must load first -- config/db.js reads process.env the moment it is
// required, and the route files pull that in further down.
require("dotenv").config();

const express = require("express");
const logger = require("./middleware/logger");
const authRoutes = require("./routes/authRoutes");
const salonRoutes = require("./routes/salonRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(logger);

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Salon APIs" });
});

app.use("/", authRoutes);
app.use("/salons", salonRoutes);
app.use("/services", serviceRoutes);

// Anything that matched no route above.
app.use((request, response) => {
  response.status(404).json({ message: "Route not found" });
});

// Express 5 forwards errors thrown inside async handlers to here.
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}!!`);
});

require("dotenv").config({ quiet: true });

const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const authRouter = require("./routes/authRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const menuRouter = require("./routes/menuRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Restaurant APIs" });
});

app.use("/", authRouter);
app.use("/restaurants", restaurantRouter);
app.use("/menu", menuRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!!`);
  });
});

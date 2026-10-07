require("dotenv").config({ quiet: true });

const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const repairRoutes = require("./routes/repairRoutes");
const partRoutes = require("./routes/partRoutes");
const driverRoutes = require("./routes/driverRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// controllers reach Socket.io through request.app.get("io")
app.set("io", io);

app.use(cors());
app.use(express.json());
// Express 5 leaves request.body undefined when no JSON is sent
app.use((request, response, next) => {
  request.body = request.body || {};
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/repairs", repairRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((request, response) => {
  response.status(404).json({ message: "Route not found" });
});

// Express 5 sends errors thrown in async controllers here
app.use((error, request, response, next) => {
  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ message: "Request body is not valid JSON!" });
  }
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return response.status(400).json({ message: messages.join(", ") });
  }
  if (error.name === "CastError") {
    return response.status(400).json({ message: `Invalid value for ${error.path}!` });
  }
  if (error.code === 11000) {
    return response
      .status(409)
      .json({ message: `${Object.keys(error.keyValue).join(", ")} already exists!` });
  }
  console.error(error);
  response.status(500).json({ message: "Something went wrong" });
});

io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!!`);
    console.log(`swagger docs at http://localhost:${PORT}/api-docs`);
  });
});

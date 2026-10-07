const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    plateNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, min: 1980 },
    mileage: { type: Number, required: true, min: 0, default: 0 },
    // how far the vehicle usually drives in a day, turns "km left" into "days left"
    avgKmPerDay: { type: Number, min: 1, default: 150 },
    status: {
      type: String,
      enum: ["active", "in_service", "out_of_service"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Vehicle", vehicleSchema);

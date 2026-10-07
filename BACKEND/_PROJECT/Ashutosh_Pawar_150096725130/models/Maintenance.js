const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    type: {
      type: String,
      enum: ["oil_change", "tire_rotation", "brake_inspection", "general_service"],
      required: true,
    },
    // the odometer reading the service is due at
    dueAtKm: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["scheduled", "completed"], default: "scheduled" },
    cost: { type: Number, min: 0, default: 0 },
    completedAt: { type: Date },
    completedAtKm: { type: Number },
    notes: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);

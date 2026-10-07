const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    issue: { type: String, required: true, trim: true },
    severity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: {
      type: String,
      enum: ["reported", "scheduled", "in_progress", "completed"],
      default: "reported",
    },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedAt: { type: Date, default: Date.now },
    mechanic: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scheduledAt: { type: Date },
    // downtime runs from startedAt (vehicle taken off the road) to completedAt
    startedAt: { type: Date },
    completedAt: { type: Date },
    partsUsed: [
      {
        _id: false,
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
        quantity: { type: Number, min: 1 },
        unitPrice: { type: Number, min: 0 },
      },
    ],
    laborCost: { type: Number, min: 0, default: 0 },
    partsCost: { type: Number, min: 0, default: 0 },
    downtimeHours: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

repairSchema.virtual("totalCost").get(function () {
  return this.laborCost + this.partsCost;
});

repairSchema.set("toJSON", { virtuals: true, versionKey: false });

module.exports = mongoose.model("Repair", repairSchema);

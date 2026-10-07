const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    audience: {
      type: String,
      enum: ["all", "drivers", "mechanics", "admins"],
      default: "all",
    },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // true once Firebase Cloud Messaging accepted it
    pushed: { type: Boolean, default: false },
    pushError: { type: String },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Notification", notificationSchema);

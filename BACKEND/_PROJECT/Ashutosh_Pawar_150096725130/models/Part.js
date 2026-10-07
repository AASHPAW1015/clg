const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    partNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    category: { type: String, trim: true, default: "general" },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    reorderLevel: { type: Number, min: 0, default: 5 },
  },
  { timestamps: true },
);

partSchema.virtual("lowStock").get(function () {
  return this.quantity <= this.reorderLevel;
});

partSchema.set("toJSON", { virtuals: true, versionKey: false });

module.exports = mongoose.model("Part", partSchema);

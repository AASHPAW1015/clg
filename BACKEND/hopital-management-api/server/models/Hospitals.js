const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  totalBeds: {
    type: Number,
    required: true,
    min: 0,
  },
  availableBeds: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Hospitals = mongoose.model("Hospitals", hospitalSchema);
module.exports = Hospitals;

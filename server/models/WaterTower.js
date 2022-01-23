const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "watertower",
  },
  bstate: {
    type: String,
    default: "new",
  },
  currentStep: {
    type: String,
    default: "0",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("watertower", userSchema);

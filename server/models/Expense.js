const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectid: {
    type: String,
  },
  date: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("expense", userSchema);

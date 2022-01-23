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
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    default: String,
  },
  newProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  pausedProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  finishedProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  inProgessProjects: {
    type: Number,
    required: true,
    default: 0,
  },
  buildingsID: [],
  waterTowerID: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("company", userSchema);

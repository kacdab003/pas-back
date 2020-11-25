const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["A", "B"],
    required: true,
  },
  state: {
    type: String,
    enum: ["a", "b", "c"],
    required: true,
  },
});

module.exports = mongoose.model("Module", moduleSchema);

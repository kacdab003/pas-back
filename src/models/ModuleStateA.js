const mongoose = require("mongoose");
const validator = require("validator");

const moduleStateASchema = new mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  accessDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ModuleStateA", moduleStateASchema);

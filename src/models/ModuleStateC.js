const mongoose = require("mongoose");

const moduleStateCSchema = new mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  repairDate: {
    type: Date,
    required: true,
  },
  repairWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value < 0 || value > 300) {
        throw new Error("Description out of bounds!");
      }
    },
  },
});

module.exports = mongoose.model("ModuleStateC", moduleStateCSchema);

const mongoose = require("mongoose");

const moduleStateCSchema = new mongoose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
    validate(value) {
      if (value < 0 || value > 999999) {
        throw new Error("Module Number out of bounds!");
      }
    },
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

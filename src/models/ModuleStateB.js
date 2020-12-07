const mongoose = require("mongoose");
const validator = require("validator");

const moduleStateBSchema = new mongoose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  objectNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0 || value > 999999) {
        throw new Error("Object Number out of bounds!");
      }
    },
  },
  socket: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0 || value > 999999) {
        throw new Error("Socket out of bounds!");
      }
    },
  },
  period: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  damageDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ModuleStateB", moduleStateBSchema);

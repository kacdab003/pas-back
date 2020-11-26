const mongoose = require("mongoose");
const validator = require("validator");

const moduleStateBSchema = new mongoose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 0, max: 999999 })) {
        throw new Error("Module Number out of bounds!");
      }
    },
  },
  objectNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 0, max: 999999 })) {
        throw new Error("Object Number out of bounds!");
      }
    },
  },
  socket: {
    type: Number,
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 0, max: 9999 })) {
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

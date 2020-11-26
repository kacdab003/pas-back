const mongoose = require("mongoose");
const validator = require("validator");

const exchangeReportSchema = new mongoose.Schema({
  exchangeDate: {
    type: Date,
    required: true,
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
  damagedModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 0, max: 999999 })) {
        throw new Error("Damaged Module Number out of bounds!");
      }
    },
  },
  newModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 0, max: 999999 })) {
        throw new Error("New Module Number out of bounds!");
      }
    },
  },
  exchangeWorkers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ExchangeReport", exchangeReportSchema);

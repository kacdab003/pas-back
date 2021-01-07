const mongoose = require("mongoose");

const exchangeReportSchema = new mongoose.Schema({
  exchangeDate: {
    type: Date,
    required: true,
  },
  objectNumber: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0 || value > 999999) {
        throw new Error("Module Number out of bounds!");
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
  damagedModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  newModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  exchangeWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ExchangeReport", exchangeReportSchema);

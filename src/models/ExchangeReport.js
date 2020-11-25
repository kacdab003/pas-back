const mongoose = require("mongoose");

const exchangeReportSchema = new mongoose.Schema({
  exchangeDate: {
    type: Date,
    required: true,
  },
  objectNumber: {
    type: Number,
    required: true,
  },
  socket: {
    type: Number,
    required: true,
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
  exchangeWorkers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ExchangeReport", exchangeReportSchema);

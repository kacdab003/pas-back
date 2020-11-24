const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    nr: Number,
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    configuration: {
      type: String,
      enum: ["1+2", "2+3", "1+3", "1+2+3"],
      required: true,
    },
    pwr_set: { type: Number, required: true },
    mod_set: { type: Number, required: true },
    module: { type: String, required: true },
    rms: { type: String, enum: ["ZAŁ", "WYŁ"] },
    objects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
      required: true,
    },
    pump: {
      type: String,
      enum: ["P1", "P2"],
      required: true,
    },
    pressure: { type: Number, required: true },
    temperatureIn: { type: Number, required: true },
    temperatureOut: { type: Number, required: true },
    resistanceIn: { type: Number, required: true },
    resistanceOut: { type: Number, required: true },
    waterCounter: { type: Number, required: true },
    openingLevelA: { type: Number, required: true },
    openingLevelB: { type: Number, required: true },
    supplyAmount: { type: Number, required: true },
    lighting: { type: Boolean, required: true },
    isCassetteOpened: { type: Boolean, required: true },
    dabExciter: { type: String, enum: ["A", "B"] },
    dabPowerOut: { type: Number, required: true },
    dabPowerReceived: { type: Number, required: true },
    dabMer: { type: Number, required: true },
    dabShoulderUp: { type: Number, required: true },
    dabShoulderDown: { type: Number, required: true },
    dabGeneral: { type: Number, required: true },
    dabTMA: { type: Number, required: true },
    dabTMB: { type: Number, required: true },
    accidentDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("Report", reportSchema);

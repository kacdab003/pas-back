const mongoose = require("mongoose");
const validator = require("validator");

const reportSchema = new mongoose.Schema(
  {
    nr: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 1 || value > 50) {
          throw new Error("Report number length out of bounds!");
        }
      },
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    configuration: {
      type: String,
      enum: ["1+2", "2+3", "1+3", "1+2+3"],
      required: true,
    },
    pwr_set: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 100) {
          throw new Error("PWR_SET length out of bounds!");
        }
      },
    },
    mod_set: {
      type: Number,
      required: true,
    },
    module: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isLength(value, { min: 1, max: 4 })) {
          throw new Error("Module length out of bounds!");
        }
      },
    },
    rms: { type: String, enum: ["ZAŁ", "WYŁ"], required: true },
    objects: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        T1: {
          type: Number,
          required: true,
        },
        T2: {
          type: Number,
          required: true,
        },
        T3: {
          type: Number,
          required: true,
        },
        C1: {
          type: Number,
          required: true,
        },
        U: [
          {
            required: false,
            moduleNumber: {
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
            type: {
              type: String,
              enum: ["A", "B"],
              required: true,
            },
          },
        ],
      },
    ],
    pump: {
      type: String,
      enum: ["P1", "P2"],
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 999999) {
          throw new Error("Pressure length out of bounds!");
        }
      },
    },
    temperatureIn: { type: Number, required: true },
    temperatureOut: { type: Number, required: true },
    resistanceIn: { type: Number, required: true },
    resistanceOut: { type: Number, required: true },
    waterCounter: { type: Number, required: true },
    openingLevelA: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 100) {
          throw new Error("Degree of opening (A) out of bounds!");
        }
      },
    },
    openingLevelB: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 100) {
          throw new Error("Degree of opening (B) out of bounds!");
        }
      },
    },
    supplyAmount: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 1000) {
          throw new Error("Supply count out of bounds!");
        }
      },
    },
    lighting: { type: Boolean, required: true },
    isCassetteOpened: { type: Boolean, required: true },
    dabExciter: { type: String, enum: ["A", "B"] },
    dabPowerOut: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 10000) {
          throw new Error("DAB_POWER_OUT out of bounds!");
        }
      },
    },
    dabPowerReceived: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 10000) {
          throw new Error("DAB_POWER_RECEIVED out of bounds!");
        }
      },
    },
    dabMer: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 10000) {
          throw new Error("DAB_MER out of bounds!");
        }
      },
    },
    dabShoulderUp: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 10000) {
          throw new Error("DAB_SHOULDER_UP out of bounds!");
        }
      },
    },
    dabShoulderDown: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 || value > 10000) {
          throw new Error("DAB_SHOULDER_DOWN out of bounds!");
        }
      },
    },
    dabGeneral: { type: Number, required: true },
    dabTMA: { type: Number, required: true },
    dabTMB: { type: Number, required: true },
    accidentDescription: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isLength(value, { min: 0, max: 300 })) {
          throw new Error("Accident Description out of bounds!");
        }
      },
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("Report", reportSchema);

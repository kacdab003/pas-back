const mongoose = require("mongoose");
const validator = require("validator");

const moduleStateASchema = new mongoose.Schema({
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
  accessDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ModuleStateA", moduleStateASchema);

const mongoose = require("mongoose");

const moduleStateASchema = new mongoose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  accessDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ModuleStateA", moduleStateASchema);

const moongose = require("mongoose");

const ModuleStateC = new moongose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
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
  },
});

module.exports = mongoose.model("ModuleStateC", moduleStateCSchema);

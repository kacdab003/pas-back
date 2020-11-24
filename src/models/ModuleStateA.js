const moongose = require("mongoose");

const ModuleStateA = new moongose.Schema({
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

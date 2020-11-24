const moongose = require("mongoose");

const Module = new moongose.Schema({
  moduleNumber: {
    type: Number,
    required: true,
  },
  type: {
    enum: ["A", "B"],
    required: true,
  },
  state: {
    enum: ["a", "b", "c"],
    required: true,
  },
});

module.exports = mongoose.model("Module", moduleSchema);

const moongose = require("mongoose");

const ModuleStateB = new moongose.Schema({
  moduleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
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
  period: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  damageDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ModuleStateB", moduleStateBSchema);

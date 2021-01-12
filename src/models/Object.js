const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Object", objectSchema);

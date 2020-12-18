const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 1, max: 20 })) {
        throw new Error("Name length out of bounds!");
      }
    },
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 1, max: 40 })) {
        throw new Error("Surname length out of bounds!");
      }
    },
  },
  position: {
    type: String,
    enum: ["ENGINEER", "TECHNICIAN"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 8, max: undefined })) {
        throw new Error("Password too short!");
      }
    },
  },
});

module.exports = mongoose.model("User", userSchema);

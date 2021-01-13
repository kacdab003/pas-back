const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: false,
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

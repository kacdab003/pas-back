const authController = require("../controllers/authController");
const { body } = require("express-validator");
const express = require("express");

const router = express.Router();
const validators = [
  body("login").isLength({ min: 1, max: 32 }),
  body("name").isLength({ min: 1, max: 32 }),
  body("surname").isLength({ min: 1, max: 32 }),
  body("position").matches(/\b(?:ENGINEER|TECHNICIAN)\b/),
  body("password").isLength({ min: 6 }),
];
router.put("/signup", validators, authController.signUp);
router.post("/login", authController.login);

module.exports = router;

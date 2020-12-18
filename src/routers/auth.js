const authController = require("../controllers/authController");

const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.put("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;

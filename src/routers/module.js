const express = require("express");
const { body } = require("express-validator");
const {
  postAddModule,
  getAllModules,
  getModuleById,
  updateModuleById,
  removeModuleById,
} = require("../controllers/moduleController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("moduleNumber").isLength({ min: 1, max: 999999 }),
  body("type").matches(/\b(?:A|B)\b/),
  body("state").matches(/\b(?:a|b|c)\b/),
];

router.post("/modules", validators, postAddModule);

router.get("/modules", getAllModules);

router.get("/modules/:id", getModuleById);

router.patch("/modules/:id", validators, updateModuleById);

router.delete("/modules/:id", removeModuleById);

module.exports = router;

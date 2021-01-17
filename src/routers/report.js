const express = require("express");
const { body } = require("express-validator");
const {
  postAddReport,
  getAllReports,
  getReportById,
  updateReportById,
  removeReportById,
} = require("../controllers/reportController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("nr").isLength({ min: 1, max: 50 }),
  body("workers").isArray(),
  body("configuration").matches(/\b(?:1\+2|2\+3|1\+3|1\+2\+3)\b/),
  body("pwr_set").isLength({ min: 1, max: 100 }),
  body("mod_set").notEmpty(),
  body("module").isLength({ min: 1, max: 4 }),
  body("rms").matches(/\b(?:ZAL|WYL)\b/),
  body("objects").isArray(),
  body("pump").matches(/\b(?:P1|P2)\b/),
  body("pressure").isLength({ min: 1, max: 999999 }),
  body("temperatureIn").notEmpty(),
  body("temperatureOut").notEmpty(),
  body("resistanceIn").notEmpty(),
  body("resistanceOut").notEmpty(),
  body("waterCounter").notEmpty(),
  body("openingLevelA").isLength({ min: 1, max: 100 }),
  body("openingLevelB").isLength({ min: 1, max: 100 }),
  body("supplyAmount").isLength({ min: 1, max: 1000 }),
  body("lighting").isBoolean(),
  body("isCassetteOpened").isBoolean(),
  body("dabExciter").matches(/\b(?:A|B)\b/),
  body("dabPowerOut").isLength({ min: 1, max: 10000 }),
  body("dabPowerReceived").isLength({ min: 1, max: 10000 }),
  body("dabMer").isLength({ min: 1, max: 10000 }),
  body("dabShoulderUp").isLength({ min: 1, max: 10000 }),
  body("dabShoulderDown").isLength({ min: 1, max: 10000 }),
  body("dabGeneral").notEmpty(),
  body("dabTMA").notEmpty(),
  body("dabTMB").notEmpty(),
  body("accidentDescription").isLength({ min: 1, max: 300 }),
];

router.post("/reports", validators, auth, postAddReport);

router.get("/reports", auth, getAllReports);

router.get("/reports/:id", auth, getReportById);

router.patch("/reports/:id", validators, auth, updateReportById);

router.delete("/reports/:id", auth, removeReportById);

module.exports = router;

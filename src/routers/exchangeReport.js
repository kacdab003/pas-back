const express = require("express");
const { body } = require("express-validator");
const {
  postAddExchangeReport,
  getAllExchangeReports,
  getExchangeReportById,
  updateExchangeReportById,
  removeExchangeReportById,
} = require("../controllers/exchangeReportController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("exchangeDate").notEmpty(),
  body("objectNumber").isLength({ min: 1, max: 999999 }),
  body("socket").isLength({ min: 1, max: 999999 }),
  body("damagedModuleNumber").isLength({ min: 1, max: 999999 }),
  body("newModuleNumber").isLength({ min: 1, max: 999999 }),
  body("exchangeWorker").isMongoId(),
];

router.post("/exchangeReports", validators, auth, postAddExchangeReport);

router.get("/exchangeReports", auth, getAllExchangeReports);

router.get("/exchangeReports/:id", auth, getExchangeReportById);

router.patch(
  "/exchangeReports/:id",
  validators,
  auth,
  updateExchangeReportById
);

router.delete("/exchangeReports/:id", auth, removeExchangeReportById);

module.exports = router;

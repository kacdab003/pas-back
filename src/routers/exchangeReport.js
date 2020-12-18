const express = require("express");
const {
  postAddExchangeReport,
  getAllExchangeReports,
  getExchangeReportById,
  updateExchangeReportById,
  removeExchangeReportById,
} = require("../controllers/exchangeReportController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/exchangeReports", postAddExchangeReport);

router.get("/exchangeReports", auth, getAllExchangeReports);

router.get("/exchangeReports/:id", getExchangeReportById);

router.patch("/exchangeReports/:id", updateExchangeReportById);

router.delete("/exchangeReports/:id", removeExchangeReportById);

module.exports = router;

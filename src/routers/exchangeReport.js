const express = require("express");
const {
  postAddExchangeReport,
  getAllExchangeReports,
  getExchangeReportById,
  updateExchangeReportById,
  removeExchangeReportById,
} = require("../controllers/exchangeReportController");
const router = new express.Router();

router.post("/exchangeReports", postAddExchangeReport);

router.get("/exchangeReports", getAllExchangeReports);

router.get("/exchangeReports/:id", getExchangeReportById);

router.patch("/exchangeReports/:id", updateExchangeReportById);

router.delete("/exchangeReports/:id", removeExchangeReportById);

module.exports = router;

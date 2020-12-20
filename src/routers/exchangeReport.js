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

router.post("/exchangeReports", auth, postAddExchangeReport);

router.get("/exchangeReports", auth, getAllExchangeReports);

router.get("/exchangeReports/:id", auth, getExchangeReportById);

router.patch("/exchangeReports/:id", auth, updateExchangeReportById);

router.delete("/exchangeReports/:id", auth, removeExchangeReportById);

module.exports = router;

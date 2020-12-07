const express = require("express");

const {
  postAddReport,
  getAllReports,
  getReportById,
  updateReportById,
  removeReportById,
} = require("../controllers/reportController");
const router = new express.Router();

router.post("/reports", postAddReport);

router.get("/reports", getAllReports);

router.get("/reports/:id", getReportById);

router.patch("/reports/:id", updateReportById);

router.delete("/reports/:id", removeReportById);

module.exports = router;

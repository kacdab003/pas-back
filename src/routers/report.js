const express = require("express");

const {
  postAddReport,
  getAllReports,
  getReportById,
  updateReportById,
  removeReportById,
} = require("../controllers/reportController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/reports", auth, postAddReport);

router.get("/reports", auth, getAllReports);

router.get("/reports/:id", auth, getReportById);

router.patch("/reports/:id", auth, updateReportById);

router.delete("/reports/:id", auth, removeReportById);

module.exports = router;

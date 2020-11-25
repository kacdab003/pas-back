const express = require("express");
const Report = require("../models/Report");
const router = new express.Router();

router.post("/reports", async (req, res) => {
  const report = new Report(req.body);

  try {
    await report.save();
    res.status(201).send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.send(reports);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).send();
    }

    res.send(report);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return res.status(404).send();
    }

    res.send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).send();
    }

    res.send(report);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

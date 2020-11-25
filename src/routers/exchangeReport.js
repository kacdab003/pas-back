const express = require("express");
const ExchangeReport = require("../models/ExchangeReport");
const router = new express.Router();

router.post("/exchangeReports", async (req, res) => {
  const exchangeReport = new ExchangeReport(req.body);

  try {
    await exchangeReport.save();
    res.status(201).send(exchangeReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/exchangeReports", async (req, res) => {
  try {
    const exchangeReports = await ExchangeReport.find({});
    res.send(exchangeReports);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/exchangeReports/:id", async (req, res) => {
  try {
    const exchangeReport = await ExchangeReport.findById(req.params.id);

    if (!exchangeReport) {
      return res.status(404).send();
    }

    res.send(exchangeReport);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/exchangeReports/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "exchangeDate",
    "objectNumber",
    "socket",
    "damagedModule",
    "newModule",
    "exchangeWorkers",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const exchangeReport = await ExchangeReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exchangeReport) {
      return res.status(404).send();
    }

    res.send(exchangeReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/exchangeReports/:id", async (req, res) => {
  try {
    const exchangeReport = await ExchangeReport.findByIdAndDelete(
      req.params.id
    );

    if (!exchangeReport) {
      return res.status(404).send();
    }

    res.send(exchangeReport);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

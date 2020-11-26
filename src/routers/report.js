const express = require("express");
const Report = require("../models/Report");
const router = new express.Router();

router.post("/reports", async (req, res) => {
  const report = new Report(req.body);

  try {
    await report.save();
    res.status(201).send(report);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
});

router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.send(reports);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
  }
});

router.get("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(report);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
  }
});

router.patch("/reports/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "nr",
    "worker",
    "configuration",
    "pwr_set",
    "mod_set",
    "module",
    "rms",
    "objects",
    "pump",
    "pressure",
    "temperatureIn",
    "temperatureOut",
    "resistanceIn",
    "resistanceOut",
    "waterCounter",
    "openingLevelA",
    "openingLevelB",
    "supplyAmount",
    "lighting",
    "isCassetteOpened",
    "dabExciter",
    "dabPowerOut",
    "dabPowerReceived",
    "dabMer",
    "dabShoulderUp",
    "dabShoulderDown",
    "dabGeneral",
    "dabTMA",
    "dabTMB",
    "accidentDescription",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!report) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(report);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
  }
});

router.delete("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send({
      message: "Resource was deleted successfully",
      deletedReport: report,
    });
  } catch (error) {
    res.status(500).send({ error: "Could not delete requsted resource" });
  }
});

module.exports = router;

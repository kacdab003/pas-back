const Report = require("../models/Report");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddReport = async (req, res) => {
  const {
    nr,
    worker,
    configuration,
    pwr_set,
    mod_set,
    module,
    rms,
    pump,
    pressure,
    temperatureIn,
    temperatureOut,
    resistanceIn,
    resistanceOut,
    waterCounter,
    openingLevelA,
    openingLevelB,
    supplyAmount,
    lighting,
    isCassetteOpened,
    dabExciter,
    dabPowerOut,
    dabPowerReceived,
    dabMer,
    dabShoulderUp,
    dabShoulderDown,
    dabGeneral,
    dabTMA,
    dabTMB,
    accidentDescription,
  } = req.body;

  const report = new Report({
    nr,
    worker,
    configuration,
    pwr_set,
    mod_set,
    module,
    rms,
    pump,
    pressure,
    temperatureIn,
    temperatureOut,
    resistanceIn,
    resistanceOut,
    waterCounter,
    openingLevelA,
    openingLevelB,
    supplyAmount,
    lighting,
    isCassetteOpened,
    dabExciter,
    dabPowerOut,
    dabPowerReceived,
    dabMer,
    dabShoulderUp,
    dabShoulderDown,
    dabGeneral,
    dabTMA,
    dabTMB,
    accidentDescription,
  });

  try {
    await report.save();
    res.status(201).send(report);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllReports = async (req, res) => {
  const reports = await Report.find({})
    .populate("worker", { name: 1, surname: 1, position: 1 })
    .populate("objects")
    .exec();

  if (!reports) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(reports);
};

exports.getReportById = async (req, res) => {
  const reportId = req.params.id;
  const report = await Report.findById(reportId)
    .populate("worker", { name: 1, surname: 1, position: 1 })
    .populate("objects")
    .exec();

  if (!report) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(report);
};

exports.updateReportById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "nr",
    "worker",
    "configuration",
    "pwr_set",
    "mod_set",
    "module",
    "rms",
    "reports",
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
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
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

    return res.status(200).send(report);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeReportById = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedReport: report,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

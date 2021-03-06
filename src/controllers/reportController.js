const Report = require("../models/Report");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");
const { validationResult } = require("express-validator");
const createError = require("../utils/createError");

exports.postAddReport = async (req, res, next) => {
  const {
    nr,
    workers,
    configuration,
    pwr_set,
    mod_set,
    module,
    rms,
    pump,
    objects,
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
    workers,
    configuration,
    pwr_set,
    mod_set,
    module,
    rms,
    pump,
    objects,
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
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    await report.save();
    res.status(201).send(report);
  } catch (error) {
    next(error);
  }
};

exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find({})
      .populate("workers", { fullName: 1, position: 1 })
      .exec();

    if (!reports) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(reports);
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId)
      .populate("workers", { fullName: 1, position: 1 })
      .exec();

    if (!report) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(report);
  } catch (error) {
    next(error);
  }
};

exports.updateReportById = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "nr",
    "workers",
    "configuration",
    "pwr_set",
    "mod_set",
    "module",
    "rms",
    "objects",
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
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    return res.status(200).send(report);
  } catch (error) {
    next(error);
  }
};

exports.removeReportById = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedReport: report,
    });
  } catch (error) {
    next(error);
  }
};

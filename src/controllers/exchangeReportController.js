const ExchangeReport = require("../models/ExchangeReport");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");

exports.postAddExchangeReport = async (req, res, next) => {
  const {
    exchangeDate,
    objectNumber,
    socket,
    damagedModule,
    newModule,
    exchangeWorker,
  } = req.body;

  const exchangeReport = new ExchangeReport({
    exchangeDate,
    objectNumber,
    socket,
    damagedModule,
    newModule,
    exchangeWorker,
  });

  try {
    await exchangeReport.save();
    res.status(201).send(exchangeReport);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllExchangeReports = async (req, res, next) => {
  try {
    const exchangeReports = await ExchangeReport.find({})
      .populate("damagedModule")
      .populate("newModule")
      .populate("exchangeWorker", { fullName: 1, position: 1 })
      .exec();

    if (!exchangeReports) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(exchangeReports);
  } catch (error) {
    next(error);
  }
};

exports.getExchangeReportById = async (req, res, next) => {
  try {
    const exchangeReportId = req.params.id;
    const exchangeReport = await ExchangeReport.findById(exchangeReportId)
      .populate("damagedModule")
      .populate("newModule")
      .populate("exchangeWorkers", { fullName: 1, position: 1 })
      .exec();

    if (!exchangeReport) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(exchangeReport);
  } catch (error) {
    next(error);
  }
};

exports.updateExchangeReportById = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "exchangeDate",
      "objectNumber",
      "socket",
      "damagedModule",
      "newModule",
      "exchangeWorker",
    ];
    const areUpdatesValid = validateUpdates(updates, allowedUpdates);

    if (!areUpdatesValid.isOperationValid) {
      throw new Error(errorTypes.INVALID_REQUEST);
    }
    const exchangeReport = await ExchangeReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exchangeReport) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(exchangeReport);
  } catch (error) {
    next(error);
  }
};

exports.removeExchangeReportById = async (req, res, next) => {
  try {
    const exchangeReport = await ExchangeReport.findByIdAndDelete(
      req.params.id
    );

    if (!exchangeReport) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedExchangeReport: exchangeReport,
    });
  } catch (error) {
    next(error);
  }
};

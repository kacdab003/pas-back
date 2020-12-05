const ExchangeReport = require("../models/ExchangeReport");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddExchangeReport = async (req, res) => {
  const exchangeReport = new ExchangeReport(req.body);

  try {
    await exchangeReport.save();
    res.status(201).send(exchangeReport);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource, details: " + error.message,
    });
  }
};

exports.getAllExchangeReports = async (req, res) => {
  const exchangeReports = await ExchangeReport.find({});
  if (!exchangeReports) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(exchangeReports);
};

exports.getExchangeReportById = async (req, res) => {
  const exchangeReportId = req.params.id;
  const exchangeReport = await ExchangeReport.findById(exchangeReportId);

  if (!exchangeReport) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(exchangeReport);
};

exports.updateExchangeReportById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "exchangeDate",
    "objectNumber",
    "socket",
    "damagedModule",
    "newModule",
    "exchangeWorkers",
  ];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid?.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
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
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(exchangeReport);
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Could not update requsted resource" });
  }
};

exports.removeExchangeReportById = async (req, res) => {
  try {
    const exchangeReport = await ExchangeReport.findByIdAndDelete(
      req.params.id
    );

    if (!exchangeReport) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedExchangeReport: exchangeReport,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

const ExchangeReport = require("../models/ExchangeReport");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddExchangeReport = async (req, res) => {
  const exchangeReport = new ExchangeReport(req.body);

  try {
    await exchangeReport.save();
    res.status(201).send(exchangeReport);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
};

exports.getAllExchangeReports = async (req, res) => {
  try {
    const exchangeReports = await ExchangeReport.find({});
    res.send(exchangeReports);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.getExchangeReportById = async (req, res) => {
  try {
    const exchangeReport = await ExchangeReport.findById(req.params.id);

    if (!exchangeReport) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(exchangeReport);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
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
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
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

    res.send(exchangeReport);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
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

    res.send({
      message: "Resource was deleted successfully",
      deletedExchangeReport: exchangeReport,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

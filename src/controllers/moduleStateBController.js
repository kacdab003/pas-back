const ModuleStateB = require("../models/ModuleStateB");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");

exports.postAddModuleStateB = async (req, res, next) => {
  const { module, objectNumber, socket, period, damageDate } = req.body;

  const moduleStateB = new ModuleStateB({
    module,
    objectNumber,
    socket,
    period,
    damageDate,
  });

  try {
    await moduleStateB.save();
    res.status(201).send(moduleStateB);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModuleStateBs = async (req, res, next) => {
  const moduleStateBs = await ModuleStateB.find({}).populate("module").exec();
  if (!moduleStateBs) {
    throw new Error();
  }

  res.status(200).send(moduleStateBs);
};

exports.getModuleStateBById = async (req, res, next) => {
  const moduleStateBId = req.params.id;
  const moduleStateB = await ModuleStateB.findById(moduleStateBId)
    .populate("module")
    .exec();

  if (!moduleStateB) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.status(200).send(moduleStateB);
};

exports.updateModuleStateBById = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "module",
    "objectNumber",
    "socket",
    "period",
    "damageDate",
  ];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const moduleStateB = await ModuleStateB.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!moduleStateB) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(moduleStateB);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeModuleStateBById = async (req, res, next) => {
  try {
    const moduleStateB = await ModuleStateB.findByIdAndDelete(req.params.id);

    if (!moduleStateB) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModuleStateB: moduleStateB,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

const ModuleStateB = require("../models/ModuleStateB");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModuleStateB = async (req, res) => {
  const moduleStateB = new ModuleStateB(req.body);

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

exports.getAllModuleStateBs = async (req, res) => {
  const moduleStateBs = await ModuleStateB.find({});
  if (!moduleStateBs) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(moduleStateBs);
};

exports.getModuleStateBById = async (req, res) => {
  const moduleStateBId = req.params.id;
  const moduleStateB = await ModuleStateB.findById(moduleStateBId);

  if (!moduleStateB) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(moduleStateB);
};

exports.updateModuleStateBById = async (req, res) => {
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

exports.removeModuleStateBById = async (req, res) => {
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

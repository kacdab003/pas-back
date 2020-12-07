const ModuleStateC = require("../models/ModuleStateC");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModuleStateC = async (req, res) => {
  const moduleStateC = new ModuleStateC(req.body);

  try {
    await moduleStateC.save();
    res.status(201).send(moduleStateC);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModuleStateCs = async (req, res) => {
  const moduleStateCs = await ModuleStateC.find({});
  if (!moduleStateCs) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(moduleStateCs);
};

exports.getModuleStateCById = async (req, res) => {
  const moduleStateCId = req.params.id;
  const moduleStateC = await ModuleStateC.findById(moduleStateCId);

  if (!moduleStateC) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(moduleStateC);
};

exports.updateModuleStateCById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "module",
    "repairDate",
    "repairWorker",
    "description",
  ];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const moduleStateC = await ModuleStateC.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateC) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(moduleStateC);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeModuleStateCById = async (req, res) => {
  try {
    const moduleStateC = await ModuleStateC.findByIdAndDelete(req.params.id);

    if (!moduleStateC) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModuleStateC: moduleStateC,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

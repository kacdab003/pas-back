const ModuleStateA = require("../models/ModuleStateA");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModuleStateA = async (req, res) => {
  const { module, accessDate } = req.body;

  const moduleStateA = new ModuleStateA({ module, accessDate });

  try {
    await moduleStateA.save();
    res.status(201).send(moduleStateA);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModuleStateAs = async (req, res) => {
  const moduleStateAs = await ModuleStateA.find({}).populate("module").exec();
  if (!moduleStateAs) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(moduleStateAs);
};

exports.getModuleStateAById = async (req, res) => {
  const moduleStateAId = req.params.id;
  const moduleStateA = await ModuleStateA.findById(moduleStateAId)
    .populate("module")
    .exec();

  if (!moduleStateA) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(moduleStateA);
};

exports.updateModuleStateAById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["module", "accessDate"];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const moduleStateA = await ModuleStateA.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateA) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(moduleStateA);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeModuleStateAById = async (req, res) => {
  try {
    const moduleStateA = await ModuleStateA.findByIdAndDelete(req.params.id);

    if (!moduleStateA) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModuleStateA: moduleStateA,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

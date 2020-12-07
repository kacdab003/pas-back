const Module = require("../models/Module");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModule = async (req, res) => {
  const module = new Module(req.body);

  try {
    await module.save();
    res.status(201).send(module);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModules = async (req, res) => {
  const modules = await Module.find({});
  if (!modules) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(modules);
};

exports.getModuleById = async (req, res) => {
  const moduleId = req.params.id;
  const module = await Module.findById(moduleId);

  if (!module) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(module);
};

exports.updateModuleById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["moduleNumber", "type", "state"];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!module) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(module);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeModuleById = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModule: module,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

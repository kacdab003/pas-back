const Module = require("../models/Module");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModules = async (req, res) => {
  const module = new Module(req.body);

  try {
    await module.save();
    res.status(201).send(module);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
};

exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find({});
    res.send(modules);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(module);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.updateModuleById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["moduleNumber", "type", "state"];
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
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

    res.send(module);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
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

    res.send({
      message: "Resource was deleted successfully",
      deletedModule: module,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

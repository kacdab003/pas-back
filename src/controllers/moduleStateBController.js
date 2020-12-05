const ModuleStateB = require("../models/ModuleStateB");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddModuleStateB = async (req, res) => {
  const moduleStateB = new ModuleStateB(req.body);

  try {
    await moduleStateB.save();
    res.status(201).send(moduleStateB);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
};

exports.getAllModuleStateBsById = async (req, res) => {
  try {
    const moduleStateBs = await ModuleStateB.find({});
    res.send(moduleStateBs);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.getModuleStateBById = async (req, res) => {
  try {
    const moduleStateB = await ModuleStateB.findById(req.params.id);

    if (!moduleStateB) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(moduleStateB);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.updateModuleStateBById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "moduleNumber",
    "objectNumber",
    "socket",
    "period",
    "damageDate",
  ];
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
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

    res.send(moduleStateB);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
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

    res.send({
      message: "Resource was deleted successfully",
      deletedModuleStateB: moduleStateB,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

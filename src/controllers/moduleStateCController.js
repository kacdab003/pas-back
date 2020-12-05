const ModuleStateC = require("../models/ModuleStateC");
const validateUpdates = require("../scripts/validateUpdates");

exports.postAddModuleStateC = async (req, res) => {
  const moduleStateC = new ModuleStateC(req.body);

  try {
    await moduleStateC.save();
    res.status(201).send(moduleStateC);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
};

exports.getAllModuleStateCs = async (req, res) => {
  try {
    const moduleStateCs = await ModuleStateC.find({});
    res.send(moduleStateCs);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.getModuleStateCById = async (req, res) => {
  try {
    const moduleStateC = await ModuleStateC.findById(req.params.id);

    if (!moduleStateC) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(moduleStateC);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.updateModuleStateCById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "moduleNumber",
    "repairDate",
    "repairWorker",
    "description",
  ];
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
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

    res.send(moduleStateC);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
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

    res.send({
      message: "Resource was deleted successfully",
      deletedModuleStateC: moduleStateC,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

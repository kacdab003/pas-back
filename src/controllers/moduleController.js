const Module = require("../models/Module");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");

exports.postAddModule = async (req, res, next) => {
  try {
    const { moduleNumber, type, state } = req.body;
    const module = new Module({
      moduleNumber,
      type,
      state,
    });

    await module.save();
    res.status(201).send(module);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find({});
    if (!modules) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(modules);
  } catch (error) {
    next(error);
  }
};

exports.getModuleById = async (req, res, next) => {
  try {
    const moduleId = req.params.id;
    const module = await Module.findById(moduleId);

    if (!module) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(module);
  } catch (error) {
    next(error);
  }
};

exports.updateModuleById = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["moduleNumber", "type", "state"];
    const areUpdatesValid = validateUpdates(updates, allowedUpdates);

    if (!areUpdatesValid.isOperationValid) {
      throw new Error(errorTypes.INVALID_REQUEST);
    }

    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!module) {
      throw new Error(errorTypes.INVALID_REQUEST);
    }

    return res.status(200).send(module);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeModuleById = async (req, res, next) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModule: module,
    });
  } catch (error) {
    next(error);
  }
};

const Module = require("../models/Module");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");
const { validationResult } = require("express-validator");
const createError = require("../utils/createError");

exports.postAddModule = async (req, res, next) => {
  try {
    const { moduleNumber, type, state } = req.body;

    const module = new Module({
      moduleNumber,
      type,
      state,
    });

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    await module.save();
    res.status(201).send(module);
  } catch (error) {
    next(error);
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

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    return res.status(200).send(module);
  } catch (error) {
    next(error);
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

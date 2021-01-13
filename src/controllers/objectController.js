const Object = require("../models/Object");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");
const { validationResult } = require("express-validator");
const createError = require("../utils/createError");

exports.postAddObject = async (req, res, next) => {
  try {
    const { name, T1, T2, T3, C1, U } = req.body;
    const object = new Object({ name, T1, T2, T3, C1, U });

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    await object.save();
    res.status(201).send(object);
  } catch (error) {
    next(error);
  }
};

exports.getAllObjects = async (req, res, next) => {
  try {
    const objects = await Object.find({}).populate("U").exec();
    if (!objects) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(objects);
  } catch (error) {
    next(error);
  }
};

exports.getObjectById = async (req, res, next) => {
  try {
    const objectId = req.params.id;
    const object = await Object.findById(objectId).populate("U").exec();

    if (!object) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(object);
  } catch (error) {
    next(error);
  }
};

exports.updateObjectById = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "T1", "T2", "T3", "C1", "U"];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const object = await Object.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!object) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }

    return res.status(200).send(object);
  } catch (error) {
    next(error);
  }
};

exports.removeObjectById = async (req, res, next) => {
  try {
    const object = await Object.findByIdAndDelete(req.params.id);

    if (!object) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedObject: object,
    });
  } catch (error) {
    next(error);
  }
};

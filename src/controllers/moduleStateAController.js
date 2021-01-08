const ModuleStateA = require("../models/ModuleStateA");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");

exports.postAddModuleStateA = async (req, res, next) => {
  try {
    const { module, accessDate } = req.body;
    const moduleStateA = new ModuleStateA({ module, accessDate });

    await moduleStateA.save();
    res.status(201).send(moduleStateA);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModuleStateAs = async (req, res, next) => {
  try {
    const moduleStateAs = await ModuleStateA.find({}).populate("module").exec();
    if (!moduleStateAs) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(moduleStateAs);
  } catch (error) {
    next(error);
  }
};

exports.getModuleStateAById = async (req, res, next) => {
  try {
    const moduleStateAId = req.params.id;
    const moduleStateA = await ModuleStateA.findById(moduleStateAId)
      .populate("module")
      .exec();

    if (!moduleStateA) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(moduleStateA);
  } catch (error) {
    next(error);
  }
};

exports.updateModuleStateAById = async (req, res, next) => {
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
      throw new Error(errorTypes.INVALID_REQUEST);
    }

    return res.status(200).send(moduleStateA);
  } catch (error) {
    next(err);
  }
};

exports.removeModuleStateAById = async (req, res, next) => {
  try {
    const moduleStateA = await ModuleStateA.findByIdAndDelete(req.params.id);

    if (!moduleStateA) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModuleStateA: moduleStateA,
    });
  } catch (error) {
    next(error);
  }
};

const ModuleStateC = require("../models/ModuleStateC");
const validateUpdates = require("../utils/validateUpdates");
const errorTypes = require("../config/errorTypes");

exports.postAddModuleStateC = async (req, res, next) => {
  try {
    const { module, repairDate, repairWorker, description } = req.body;

    const moduleStateC = new ModuleStateC({
      module,
      repairDate,
      repairWorker,
      description,
    });
    await moduleStateC.save();
    res.status(201).send(moduleStateC);
  } catch (error) {
    return res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllModuleStateCs = async (req, res, next) => {
  try {
    const moduleStateCs = await ModuleStateC.find({})
      .populate("module")
      .populate("repairWorker")
      .exec();
    if (!moduleStateCs) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(moduleStateCs);
  } catch (error) {
    next(error);
  }
};

exports.getModuleStateCById = async (req, res, next) => {
  try {
    const moduleStateCId = req.params.id;
    const moduleStateC = await ModuleStateC.findById(moduleStateCId)
      .populate("module")
      .populate("repairWorker")
      .exec();

    if (!moduleStateC) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(moduleStateC);
  } catch (error) {
    next(error);
  }
};

exports.updateModuleStateCById = async (req, res, next) => {
  try {
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

    const moduleStateC = await ModuleStateC.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateC) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(moduleStateC);
  } catch (error) {
    next(error);
  }
};

exports.removeModuleStateCById = async (req, res, next) => {
  try {
    const moduleStateC = await ModuleStateC.findByIdAndDelete(req.params.id);

    if (!moduleStateC) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedModuleStateC: moduleStateC,
    });
  } catch (error) {
    next(error);
  }
};

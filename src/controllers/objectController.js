const Object = require("../models/Object");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddObject = async (req, res) => {
  const { name, T1, T2, T3, C1, U } = req.body;

  const object = new Object({ name, T1, T2, T3, C1, U });

  try {
    await object.save();
    res.status(201).send(object);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllObjects = async (req, res) => {
  const objects = await Object.find({}).populate("U").exec();
  if (!objects) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(objects);
};

exports.getObjectById = async (req, res) => {
  const objectId = req.params.id;
  const object = await Object.findById(objectId).populate("U").exec();

  if (!object) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(object);
};

exports.updateObjectById = async (req, res) => {
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
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(object);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeObjectById = async (req, res) => {
  try {
    const object = await Object.findByIdAndDelete(req.params.id);

    if (!object) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedObject: object,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

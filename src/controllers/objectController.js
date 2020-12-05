const Object = require("../models/Object");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddObject = async (req, res) => {
  const object = new Object(req.body);

  try {
    await object.save();
    res.status(201).send(object);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
};

exports.getAllObjects = async (req, res) => {
  try {
    const objects = await Object.find({});
    res.send(objects);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.getObjectById = async (req, res) => {
  try {
    const object = await Object.findById(req.params.id);

    if (!object) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(object);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
};

exports.updateObjectById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "T1", "T2", "T3", "C1", "U"];
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
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

    res.send(object);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
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

    res.send({
      message: "Resource was deleted successfully",
      deletedObject: object,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
};

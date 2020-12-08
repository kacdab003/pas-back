const User = require("../models/User");
const validateUpdates = require("../utils/validateUpdates");

exports.postAddUser = async (req, res) => {
  const { name, surname, position, password } = req.body;

  const user = new User({ name, surname, position, password });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  res.status(200).send(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(404)
      .send({ message: "Could not find requsted resource" });
  }

  return res.send(user);
};

exports.updateUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "surname", "position", "password"];
  const areUpdatesValid = validateUpdates(updates, allowedUpdates);

  if (!areUpdatesValid.isOperationValid) {
    return res.status(400).send({ error: areUpdatesValid.error });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({
      error: `Could not update requsted resource`,
      details: error.message,
    });
  }
};

exports.removeUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    return res.status(200).send({
      message: "Resource was deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.message,
    });
  }
};

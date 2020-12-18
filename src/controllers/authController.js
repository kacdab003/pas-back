const User = require("../models/User");
const validateUpdates = require("../utils/validateUpdates");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  const { login, name, surname, position, password } = req.body;

  const hashedPwd = await bcrypt.hash(password, 12);
  const userToCreate = { login, name, surname, position };
  const user = new User({ ...userToCreate, password: hashedPwd });

  try {
    await user.save();

    const userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(201).send({ token: userToken });
  } catch (error) {
    return res.status(400).send({
      error: "Could not add requsted resource",
      details: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { login, password } = req.body;

  const foundUser = await User.findOne({ login });
  if (!foundUser) {
    return res.status(404).send({ message: "Could not authenticate" });
  }
  const isPasswordValid = bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    return res.status(404).send({ message: "Could not authenticate" });
  }

  const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);
  return res.status(200).send({ token });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.status(404).send({
      message: "Could not find requsted resource",
    });
  }

  return res.status(200).send(users);
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

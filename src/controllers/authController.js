const User = require("../models/User");
const validateUpdates = require("../utils/validateUpdates");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorTypes = require("../config/errorTypes");
const authConfig = require("../config/auth");
const { validationResult } = require("express-validator");
const createError = require("../utils/createError");
exports.signUp = async (req, res, next) => {
  try {
    const { login, name, surname, position, password } = req.body;

    const hashedPwd = await bcrypt.hash(password, 12);
    const userToCreate = { login, fullName: `${name} ${surname}`, position };
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw createError(errorTypes.INVALID_REQUEST, {
        message: "Dane nie spełniają wymagań.",
        errors: validationErrors.array(),
      });
    }
    const user = new User({ ...userToCreate, password: hashedPwd });

    await user.save();

    const userToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      authConfig
    );

    return res.status(201).send({ token: userToken });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const foundUser = await User.findOne({ login });
    if (!foundUser) {
      throw createError(
        errorTypes.INVALID_REQUEST,
        "Nie znaleziono użytkownika"
      );
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw createError(
        errorTypes.INVALID_REQUEST,
        "Podane dane nie są prawidłowe."
      );
    }

    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.JWT_SECRET,
      authConfig
    );
    const userFullName = foundUser.name + " " + foundUser.surname;
    return res.status(200).send({
      token,
      fullName: userFullName,
      expiresIn: Number(process.env.TOKEN_EXPIRES_IN),
      userId: foundUser._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "surname", "position", "password"];
    const areUpdatesValid = validateUpdates(updates, allowedUpdates);

    if (!areUpdatesValid.isOperationValid) {
      throw new Error(
        errorTypes.INVALID_REQUEST,
        "Aktualizacja przesłanych pól nie jest dozwolona"
      );
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

exports.removeUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      throw new Error(errorTypes.NOT_FOUND_ERROR);
    }

    return res.status(200).send({
      message: "Usunięcie zakończone sukcesem",
      deletedUser: user,
    });
  } catch (error) {
    next(error);
  }
};

const User = require("../models/User");

exports.getWorkers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

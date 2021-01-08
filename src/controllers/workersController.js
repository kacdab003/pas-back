const User = require("../models/User");

exports.getWorkers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).send(users);
};

const jwt = require("jsonwebtoken");
const errorTypes = require("../config/errorTypes");
module.exports = (req, res, next) => {
  try {
    const token = req.get("Authorization")?.split(" ")?.[1];
    if (!token) {
      return res.status(401).send({ message: "Could not authenticate!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).send({ message: "Could not authenticate!" });
    }
    req.userId = decodedToken.userId;
    req.isAuthenticated = true;
    next();
  } catch (error) {
    next(errorTypes.NOT_AUTHORIZED);
  }
};

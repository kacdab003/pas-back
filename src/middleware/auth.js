const jwt = require("jsonwebtoken");
const errorTypes = require("../config/errorTypes");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("No auth token was provided");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Error when decodning token");
    }
    req.userId = decodedToken.userId;
    req.isAuthenticated = true;
    next();
  } catch (error) {
    next(errorTypes.NOT_AUTHORIZED);
  }
};

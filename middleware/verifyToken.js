const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1] || null;
  if (!token) {
    return next(appError.create(401, "Failed", "Login is Required"));
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    return next(appError.create(401, "failed", "Invalid Token"));
  }
};

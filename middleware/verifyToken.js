const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const requestStatus = require("../utils/requestStatus");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return next(
      appError.create(401, requestStatus.FAIL, "Authorization is Required")
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(appError.create(401, requestStatus.FAIL, "Login is Required"));
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    return next(appError.create(401, requestStatus.FAIL, "Invalid Token"));
  }
};

module.exports = verify;

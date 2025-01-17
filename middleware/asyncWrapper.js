const appError = require("../utils/appError");
const requestStatus = require("../utils/requestStatus");

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      return next(appError.create(500, requestStatus.ERROR, err));
    });
  };
};

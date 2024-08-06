const asyncWrapper = require("../middleware/asyncWrapper");
const Users = require("../models/users.model");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const newToken = require("../utils/newToken");
const requestStatus = require("../utils/requestStatus");

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      appError.create(
        401,
        requestStatus.FAIL,
        "Email and Password are Required"
      )
    );
  }
  const user = await Users.findOne({ email });
  if (!user) {
    return next(
      appError.create(401, requestStatus.FAIL, "Email or Password is Wrong")
    );
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if ((user, matchPassword)) {
    const token = await newToken({ email, password });
    return res.status(201).json({
      status: requestStatus.SUCCESS,
      token,
      message: "login is successfuly",
    });
  } else {
    return next(
      appError.create(401, requestStatus.FAIL, "Email or Password is Wrong")
    );
  }
});

const getUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ users });
};

module.exports = { login, getUsers };

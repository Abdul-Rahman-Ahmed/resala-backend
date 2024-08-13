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

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await Users.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(
      400,
      requestStatus.FAIL,
      "this user already exists"
    );
    return next(error);
  }
  if (!firstName || !lastName || !email || !password) {
    appError.create(401, requestStatus.FAIL, "mising data");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ status: requestStatus.SUCCESS, user: newUser });
});

const getUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ users });
};

module.exports = { login, register, getUsers };

const express = require("express");
const {
  login,
  getUsers,
  register,
} = require("../controllers/users.controllers");
const verify = require("../middleware/verifyToken");
const Router = express.Router();

Router.post("/login", login);
Router.post("/register", register);
Router.get("/allusers", verify, getUsers);

module.exports = Router;

const express = require("express");
const { login, getUsers } = require("../controllers/users.controllers");
const verify = require("../middleware/verifyToken");
const Router = express.Router();

Router.post("/login", login);
Router.get("/allusers", verify, getUsers);

module.exports = Router;

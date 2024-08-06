const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "this must be email"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", usersSchema);

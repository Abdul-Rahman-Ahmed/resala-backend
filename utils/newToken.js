const jwt = require("jsonwebtoken");

const newToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = newToken;

const jwt = require("jsonwebtoken");
const secretKey = "spider@123";

function createToken(user) {
  const payLoad = {
    _id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payLoad, secretKey);
  return token;
}

function getTokenData(token) {
  try {
    const payLoad = jwt.verify(token, secretKey);
    return payLoad;
  } catch (error) {
    throw new Error("nottt");
  }
}

module.exports = { createToken, getTokenData };

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
  } catch (error) {
    return null;
  }
}

module.exports = { createToken, getTokenData };

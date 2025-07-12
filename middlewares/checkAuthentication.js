const { getTokenData } = require("../service/auth");

function checkAuthenTication(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    console.log("token found = ", token);
    const userPayload = getTokenData(token);
    console.log("payload found = ", userPayload);
    req.validUser = userPayload;
    if (!userPayload) {
    }
    next();
  };
}

function restricted(req, res, next) {
  if (!req.validUser) {
    res.restricted("/");
  }
}

module.exports = { checkAuthenTication, restricted };

const { getTokenData } = require("../service/auth");

function checkAuthenTication(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    try {
      const userPayload = getTokenData(token);
      req.validUser = userPayload;
      return next();
    } catch (error) {
     return res.render("signUp");
    }
  };
}

function restricted(req, res, next) {
  if (!req.validUser) {
    res.restricted("/");
  }
}

module.exports = { checkAuthenTication, restricted };

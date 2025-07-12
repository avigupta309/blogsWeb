const { Router } = require("express");
const { restricted } = require("../middlewares/checkAuthentication");

const staticRouter = Router();
staticRouter.get("/", restricted ,(req, res) => {
  return res.render("home");
});

staticRouter.get("/signIn", (req, res) => {
  return res.render("signIn");
});

staticRouter.get("/signUp", (req, res) => {
  return res.render("signUp");
});

module.exports = { staticRouter };

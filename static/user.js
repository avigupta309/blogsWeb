const { Router } = require("express");
const { checkAuthenTication } = require("../middlewares/checkAuthentication");
const { blogsModel } = require("../models/blog");
const { commentModel } = require("../models/comment");

const staticRouter = Router();

staticRouter.get("/", checkAuthenTication("tokenId"), async (req, res) => {
  const allBlogs = await blogsModel.find({});
  return res.render("home", {
    userHome: req.validUser,
    blogs: allBlogs,
  });
});

staticRouter.get(
  "/blogs/:id",
  checkAuthenTication("tokenId"),
  async (req, res) => {
    const user = await blogsModel.findById(req.params.id).populate("createdBy");
    const cmntUser = await commentModel
      .find({ blockId: req.params.id })
      .populate("createdBy");
    res.render("detail", {
      blogDetails: user,
      validuser: req.validUser,
      cmntUser,
    });
  }
);

staticRouter.get("/signIn", (req, res) => {
  return res.render("signIn");
});

staticRouter.get("/signUp", (req, res) => {
  return res.render("signUp");
});

staticRouter.get("/logout", (req, res) => {
  return res.clearCookie("tokenId").redirect("/");
});

staticRouter.get("/add-blogs", checkAuthenTication("tokenId"), (req, res) => {
  return res.render("blogs", {
    userHome: req.validUser,
  });
});

module.exports = { staticRouter };

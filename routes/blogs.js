const { Router } = require("express");

const blogsRouter = Router();

const { updateBlogs } = require("../controllers/blogs");
const { upload } = require("./multer/blogs");
const { checkAuthenTication } = require("../middlewares/checkAuthentication");

blogsRouter.post(
  "/",
  upload.single("coverImageUrl"),
  checkAuthenTication("tokenId"),
  updateBlogs
);

module.exports = { blogsRouter };

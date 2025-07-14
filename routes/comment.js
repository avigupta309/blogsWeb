const { Router } = require("express");
const commentRouter = Router();

const { handleComment } = require("../controllers/comment");
const { checkAuthenTication } = require("../middlewares/checkAuthentication");

commentRouter.post("/:id", checkAuthenTication("tokenId"), handleComment);

module.exports = { commentRouter };

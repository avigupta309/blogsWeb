const { commentModel } = require("../models/comment");

async function handleComment(req, res) {
  const { content } = req.body;
  await commentModel.create({
    content,
    blockId: req.params.id,
    createdBy: req.validUser._id,
  });

  res.redirect(`/blogs/${req.params.id}`);
}

module.exports = { handleComment };

const { blogsModel } = require("../models/blog");

async function updateBlogs(req, res) {
  const { title, body } = req.body;
  await blogsModel.create({
    title,
    body,
    coverImageUrl: `/blogsUploads/blogsImages/${req.file.filename}`,
    createdBy: req.validUser._id,
  });
  res.redirect("/");
}

module.exports = { updateBlogs };

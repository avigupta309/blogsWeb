const { blogsModel } = require("../models/blog");

// async function updateBlogs(req, res) {
//   const { title, body } = req.body;
//   await blogsModel.create({
//     title,
//     body,
//     coverImageUrl: `/blogsUploads/blogsImages/${req.file.filename}`,
//     createdBy: req.validUser._id,
//   });
//   res.redirect("/");
// }

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function updateBlogs(req, res) {
  const { title, body } = req.body;
  let coverImageUrl = "";
  if (req.file) {
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogsImages" },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    try {
      const result = await uploadFromBuffer(req.file.buffer);
      coverImageUrl = result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).send("Image upload failed");
    }
  }

  await blogsModel.create({
    title,
    body,
    coverImageUrl,
    createdBy: req.validUser._id,
  });
  res.redirect("/");
}

module.exports = { updateBlogs };

const { userModel } = require("../models/user");
const { createToken } = require("../service/auth");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleSignUp(req, res) {
  const { fullName, email, role, password } = req.body;
  // const imageLink = `/uploads/${req.file.filename}`;
  let imageLink = "/images/profileImg.png";

  if (req.file) {
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profileImages" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    try {
      const result = await uploadFromBuffer(req.file.buffer);
      imageLink = result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).send("Image upload failed");
    }
  }

  await userModel.create({
    fullName,
    email,
    role,
    imageLink,
    password,
  });
  return res.redirect("/signIn");
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.matchPassword(email, password);
    const token = createToken(user);
    res.cookie("tokenId", token);
    return res.status(200).redirect("/");
  } catch (error) {
    res.render("signUp", {
      errorMsg: "cannot match",
    });
  }
}

module.exports = { handleSignIn, handleSignUp };

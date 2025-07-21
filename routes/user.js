const { Router } = require("express");
const userRouter = Router();
const multer = require("multer");
const { handleSignIn, handleSignUp } = require("../controllers/user");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const timeStamp = new Date().toISOString().replace(/:/g, "-");
//     const originalName = file.originalname;
//     cb(null, `${timeStamp}-${originalName}`);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });


userRouter.post("/", upload.single("profileImage"), handleSignUp);
userRouter.post("/signin", handleSignIn);

module.exports = { userRouter };

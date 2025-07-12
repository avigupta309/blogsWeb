const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { type } = require("os");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  imageLink: {
    type: String,
    required: true,
    trim: true,
    default: "/images/profileImg.png",
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hasshPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hasshPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("email is Wrong");
  const salt = user.salt;
  const hashPassword = user.password;
  const userProvidedHas = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userProvidedHas !== hashPassword)
    throw new Error("Password is incorrect  !");
  return user;
});

const userModel = model("app", userSchema);
module.exports = { userModel };

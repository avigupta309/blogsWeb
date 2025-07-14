const { userModel } = require("../models/user");
const { createToken } = require("../service/auth");

async function handleSignUp(req, res) {
  const { fullName, email, role, password } = req.body;
  const imageLink = `/uploads/${req.file.filename}`;
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

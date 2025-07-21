require("dotenv").config();
const express = require("express");
const app = express();
const { connectMongoDB } = require("./connection");
const { userRouter } = require("./routes/user");
const { staticRouter } = require("./static/user");
const { commentRouter } = require("./routes/comment");
const path = require("path");
const cookieParser = require("cookie-parser");
const { blogsRouter } = require("./routes/blogs");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/blogsUploads/blogsImages", express.static("blogsUploads/blogsImages"));
app.use(express.static("public"));
app.use(cookieParser());

connectMongoDB(process.env.MONGO_URL);

app.use("/", staticRouter);
app.use("/handleuser", userRouter);
app.use("/blogs", blogsRouter);
app.use("/comment", commentRouter);


if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}


module.exports = app;

const express = require("express");
const port = 120;
const app = express();
const { connectMongoDB } = require("./connection");
const { userRouter } = require("./routes/user");
const { staticRouter } = require("./static/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuthenTication } = require("./middlewares/checkAuthentication");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
connectMongoDB("mongodb://127.0.0.1:27017/Blogs2");

app.use(checkAuthenTication("tokenId"))

app.use('/',staticRouter)

app.use("/handleuser", userRouter);

app.listen(port, () => {
  console.log("server is Started !");
});

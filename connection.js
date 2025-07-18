const mongoose = require("mongoose");

function connectMongoDB(url) {
  console.log("hello");
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB COnnected Sucessfully !");
    })
    .catch((error) => {
      console.log("MongoDb Cannot Connected !", error);
    });
}

module.exports = { connectMongoDB };

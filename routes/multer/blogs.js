const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./blogsUploads/blogsImages");
  },
  filename: function (req, file, cb) {
    const timeStamp = new Date().toISOString().replace(/:/g, "-");
    const originalName = file.originalname;
    cb(null, `${timeStamp}-${originalName}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };

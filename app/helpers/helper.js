const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, "uploads");
  },
  filename: (req, file, cb) => {
  cb(null, file.fieldname + path.extname(file.originalname) );
  },
});
  
const fileFilter = (req, file, cb) => {
  if (
  file.mimetype === "image/png" ||
  file.mimetype === "image/jpg" ||
  file.mimetype === "image/jpeg" ||
  file.mimetype === "image/gif"
  ) {
  cb(null, true);
  } else {
  cb(new Error("File format should be PNG,JPG,JPEG,GIF"), false);
  }
};

const uploadImage = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadImage;
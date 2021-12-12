const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//! MODIFICATION A REALISER//

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts");
  },
  filename: (req, file, callback) => {
    const user = file.originalname.split("-").join("_"); //! Nom du fichier
    const name = "Post_" + user;

    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const multerConfig = multer({ storage }).single("file");

module.exports = multerConfig;

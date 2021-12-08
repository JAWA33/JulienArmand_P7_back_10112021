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
    const newname = file.originalname.split(".").join("_"); //!JSON.parse(req.body.sauce);  A remplacer par champ spécifique
    console.log(newname /*.name*/);

    const name = newname /*.name*/
      .split(" ")
      .join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const multerConfig = multer({ storage }).single("file");

module.exports = multerConfig;

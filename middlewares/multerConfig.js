const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//! MODIFICATION A REALISER//

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log("Voici la requete");
    const newname = "testimage"; //!JSON.parse(req.body.sauce);  A remplacer par champ spécifique
    console.log(newname /*.name*/);

    const name = newname /*.name*/
      .split(" ")
      .join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const multerConfig = multer({ storage }).single("image");

module.exports = multerConfig;

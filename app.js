const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./database/dbConnect.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");

//* Connexion à la base de données MySQL (en tant que 'administrateur') :
dbConnect.connect((error) => {
  if (error) {
    console.log("Erreur de connexion");
    throw error;
  } else {
    console.log("Mysql : Groupcom is connected");
  }
});

//* Utilisation d'express :

const app = express();

//* Autorisation CORS (version fromscratch):
app.use(cors());

//* Utilisation des cookies:
app.use(cookieParser());

//* Connexion pour envoi sans body-parser :
app.use(express.json());

//! A MODIFIER POUR GESTION DES IMAGES : MULTER
//app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

module.exports = app;

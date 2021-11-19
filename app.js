const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const dbConnect = require("./database/dbConnect.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");
//const icomRoute = require("./routes/icomRoute.js");

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

//* Gestion de la route d'enregistrement des images : MULTER
//! à vérifier ------- ////
app.use("images/profils", express.static(path.join(__dirname, "images")));
app.use("images/posts", express.static(path.join(__dirname, "images")));

//* Routes principales de l'api :

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
//app.use("/api/icom", icomRoute);

module.exports = app;

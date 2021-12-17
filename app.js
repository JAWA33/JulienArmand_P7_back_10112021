const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const dbConnect = require("./database/dbConnect.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");
const jobRoute = require("./routes/jobRoute.js");
//const icomRoute = require("./routes/icomRoute.js");

const dotenv = require("dotenv");
//const authorize = require("./middlewares/authorize.js");
const checked = require("./middlewares/checked.js");
const authorize = require("./middlewares/authorize.js");
//const { checkUser } = require("./utils/sqlRequest.js");

dotenv.config({ path: "../../../../.env" });

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
const corsOptions = {
  origin: process.env.GC_AUTHORIZED_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//* Utilisation des cookies:
app.use(cookieParser());

//* Connexion pour envoi sans body-parser :
app.use(express.json());

//* Verification de connexion :
//app.get("*", checked); A VOIR SI CHECK UTILE
app.get("/jwtid", authorize, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

//* Gestion de la route d'enregistrement des images : MULTER
//! à vérifier ------- ////

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

//* Routes principales de l'api :
app.use("/api/job", jobRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
//app.use("/api/icom", icomRoute);

module.exports = app;

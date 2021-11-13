import express from "express";

import dbConnect from "./database/dbConnect.js";

//* Utilisation d'express :

const app = express();

//* Connexion pour envoi sans body-parser :
app.use(express.json());

//* Connexion à la base de données MySQL (en tant que 'administrateur') :
dbConnect.connect((error) => {
  if (error) {
    console.log("Erreur de connexion");
    throw error;
  } else {
    console.log("Mysql : Groupcom is connected");
  }
});

export default app;

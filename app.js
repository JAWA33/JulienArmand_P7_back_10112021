import express from "express";

//* Utilisation d'express :

const app = express();

//* Connexion pour envoi sans body-parser :
app.use(express.json());

export default app;

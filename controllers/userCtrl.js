const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dbConnect = require("../database/dbConnect.js");
const { get } = require("http");
const fs = require("fs");

const sqlReq = require("../utils/sqlRequest.js");

dotenv.config({ path: "../.env" });

//* C : ######### USER SIGNUP : Save A New User (post)###########
/* request format : {
    "firstname" : "prenom",
    "email":"mail@groupomania.com",
    "password":"EEss_pass_33",
    "controlPass" :"EEss_pass_33",
    "id_job" : 12 
})
*/

exports.signup = (req, res, next) => {
  // Vérification correspondance mot de passe et confirmation
  if (req.body.password !== req.body.controlPass) {
    res.status(201).json({
      message: "Votre mot de passe ne correspond pas à votre confirmation",
    });
  } else {
    if (
      req.body.email &&
      req.body.password &&
      req.body.firstname &&
      req.body.id_job
    ) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const password = hash;
          const firstname = req.body.firstname;
          const email = req.body.email;
          const jobID = req.body.id_job;
          const url_image = `${req.protocol}://${req.get(
            "host"
          )}/images/profils/Default_profil.jpg`;

          dbConnect.query(
            sqlReq.signup,
            [firstname, email, password, jobID, url_image],
            (err) => {
              if (err) {
                console.log("Erreur dans les données" + err);
                res.status(200).json({
                  message:
                    "Utilisateur déjà enregistré : Merci de saisir un autre e-mail ou de vous connecter avec votre mot de passe depuis la page d'accueil",
                });
              } else {
                console.log("Utilisateur enregistré");
                res.status(201).json({
                  message:
                    "Vous avez été enregistré : Merci de vous connecter avec votre mot de passe depuis la page d'accueil",
                });
              }
            }
          );
        })
        .catch((err) => res.status(500).json({ err }));
    } else if (!req.body.email || !req.body.password || !req.body.firstname) {
      return res.status(200).json({
        message:
          "Erreur dans la transmission des données : Vérifier la requête",
      });
    }
  }
};

//* R : ######### USER LOGIN : Connect Registred User (post) ###########
/* request format : {
    "email":"mail@groupomania.com",
    "password":"EEss_pass_33",
})
*/

exports.login = (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;

    dbConnect.query(sqlReq.login, email, (err, result) => {
      if (!result[0]) {
        console.log("Pas de compte trouvé" + err);
        res.status(200).json({
          message: "Pas de compte trouvé : Vérifiez votre email",
        });
      } else if (result && !result[1]) {
        bcrypt
          .compare(req.body.password, result[0].user_password)
          .then((valid) => {
            if (!valid) {
              console.log("Erreur de mot de passe");
              res.status(200).json({
                message:
                  "Pas de compatibilité entre votre email et votre mot de passe : Merci de les vérifier",
              });
            } else if (result[1]) {
              console.log("Doublon dans les emails");
              res.status(200).json({
                message:
                  "Impossibilité d'accès à votre compte : Merci de prévenir l'administrateur du site",
              });
            } else if (valid) {
              console.log("Compte trouvé");

              //création du cookie :
              const token = jwt.sign(
                {
                  statusUser: result[0].user_status,
                  id_user: result[0].id_user,
                },
                process.env.GC_TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              );
              // Envoi du token dans un cookie
              res.cookie("jwt", token);
              console.log("Token envoyé");

              // Modification timestamp de dernière connexion
              dbConnect.query(
                sqlReq.updateLastConnect,
                result[0].id_user,
                (err) => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({
                      message: "Echec enregistrement de la nouvelle connexion",
                    });
                  } else {
                    console.log("Nouvelle connexion enregistrée");
                    delete result[0].user_password; //Ne pas envoyer le mot de passe au frontend
                    //result[0].user_lastconnect = Date.now();
                    res.status(200).json(result[0]);
                  }
                }
              );
            }
          });
      }
    });
  } else if (!req.body.email) {
    return res.status(200).json({
      message: "Merci de saisir un email pour accèder à votre compte",
    });
  } else if (!req.body.password) {
    return res.status(200).json({
      message: "Merci de saisir un mot de passe pour accèder à votre compte",
    });
  }
};

//* D : ######### USER LOGOUT : Disconnect User (delete)###########

exports.logout = (req, res) => {
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
    console.log("Vous êtes déconnecté");
    res.status(200).json({ message: "Vous êtes déconnecté" });
  }
};

//* R : ######### USER GET ALL : Selected all User Data (get)###########

exports.getAllUser = (req, res) => {
  dbConnect.query(sqlReq.allUser, (err, result) => {
    if (err) {
      console.log("Erreur " + err);
    } else {
      res.status(201).json(result);
    }
  });
};

//* R : ######### USER GET ONE : Selected one User Data by his ID (get)###########

exports.getOneUser = (req, res) => {
  const idUser = req.params.id;

  dbConnect.query(sqlReq.oneUser, idUser, (err, result) => {
    if (err) {
      console.log("Erreur " + err);
    } else {
      res.status(201).json(result);
    }
  });
};

//* U : ######### USER UPDATE : Update one User Data by his ID (put) ###########

/* request format: {
  "lastname":"nom",
  "firstname":"prénom",
  "phone":"0X.XX.XX.XX.XX",
  "age" :"timestamp",
  "bio" : "Ce que vous devez savoir sur moi",
  "skill" : "Mes compétences",
  "hobbie" : "Mes hobbies",
  "id_job" : "nbre"

  + "url_image" : file to download
}
*/

exports.updateUser = (req, res) => {
  if (req.cookies.jwt) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;

    // console.log(id_user);
    // console.log(req.body.firstname);
    // console.log(req.body.lastname);

    if (id_user == req.params.id && req.body.firstname && req.body.id_job) {
      const lastname = req.body.lastname;
      const firstname = req.body.firstname; // not Null
      const phone = req.body.phone;
      const age = req.body.age;
      const bio = req.body.bio;
      const skill = req.body.skill;
      const hobbie = req.body.hobbie;
      const id_job = req.body.id_job; //not Null

      const url_image = req.file
        ? `${req.protocol}://${req.get("host")}/images/profils/${
            req.file.filename
          }`
        : req.body.url_image;

      //! A vérifier + Ajouter suppresion de l'ancienne image de profil !!!!!!!!!!!!!!

      dbConnect.query(
        sqlReq.updateUser,
        [
          firstname,
          lastname,
          phone,
          age,
          bio,
          skill,
          hobbie,
          url_image,
          id_job,
          id_user,
        ],
        (err, result) => {
          if (err) {
            console.log("Erreur " + err);
          } else {
            res.status(201).json(result);
          }
        }
      );
    } else if (!req.body.firstname || !req.body.id_job) {
      res.status(400).json({
        message:
          "Vous devez au minimum remplir un prénom et votre poste pour mettre à jour votre profil",
      });
    } else if (id_user !== req.params.id) {
      res.clearCookie("jwt");
      res.status(400).json({
        message:
          "Un problème est survenu, merci de vous reconnecter. Vous serez redirigé vers la page d'acceuil dans 5 secondes",
      });
    }
  }
};

//* D : ######### USER DELETE : Delete one User Data by his ID (delete) ###########

exports.deleteUser = (req, res) => {
  if (req.cookies.jwt) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;

    if (id_user != req.params.id) {
      res.clearCookie("jwt");
      res.status(400).json({
        message:
          "Un problème est survenu, merci de vous reconnecter. Vous serez redirigé vers la page d'acceuil dans 5 secondes",
      });
    } else if (id_user == req.params.id) {
      dbConnect.query(sqlReq.deleteUser, id_user, (err) => {
        if (err) {
          res.status(500).json({
            message:
              "Suppression impossible : Contacter l'administrateur du site",
          });
        } else {
          res.clearCookie("jwt");
          console.log("Suppression du compte effectué");
          res.status(200).json({ message: "Votre compte a été supprimé" });
        }
      });
    }
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dbConnect = require("../database/dbConnect.js");
const { get } = require("http");

dotenv.config({ path: "../.env" });

// exports.signup = (req, res) => {
//   //! A REMPLACER juste pour Test :
//   const name = req.body.name;
//   const sql = "SELECT * FROM gc_users";

//   dbConnect.query(sql, (err, result) => {
//     if (err) {
//       console.log("Erreur " + err);
//     } else {
//       res.status(201).json(result);
//     }
//   });
// };

//* ######### SIGNUP : Save A New User ###########
/*
request format : {
    "firstname" : "prenom",
    "email":"mail@groupomania.com",
    "password":"EEss_pass_33",
    "controlPass" :"EEss_pass_33",
    "id_job" : 12 
})
*/

exports.signup = (req, res) => {
  // Vérification correspondance mot de passe et confirmation
  if (req.body.password !== req.body.controlPass) {
    res.status(401).json({
      message: "Votre mot de passe ne correspond pas à votre confirmation",
    });
  } else {
    // //! A exporter dans fichier js séparé
    const sql_signup =
      "INSERT INTO gc_users (user_firstname, user_email, user_password, user_id_job) VALUES (?,?,?,?)";

    if (
      validEmail(req.body.email) &&
      validPassword(req.body.password) &&
      validName(req.body.firstname)
    ) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const password = hash;
          const firstname = req.body.firstname;
          const email = req.body.email;
          const jobID = req.body.id_job;

          dbConnect.query(
            sql_signup,
            [firstname, email, password, jobID],
            (err) => {
              if (err) {
                console.log("Email déjà enregistré" + err);
                res.status(400).json({
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
    } else if (!validEmail(req.body.email)) {
      return res.status(400).json({
        message:
          "E-mail non valide : doit contenir une adresse de type : #prenom#@groupomania.xx(x) ",
      });
    } else if (!validPassword(req.body.password)) {
      return res.status(400).json({
        message:
          "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères",
      });
    } else if (!validName(req.body.firstname)) {
      return res.status(400).json({
        message:
          "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
      });
    }
  }
};

//* ######### LOGIN : Connect Registred User ###########
/*
request format : {
    "email":"mail@groupomania.com",
    "password":"EEss_pass_33",
})
*/

exports.login = (req, res) => {
  // //! A exporter dans fichier js séparé
  const sql_login = "SELECT * FROM gc_users WHERE user_email =?";

  if (
    req.body.email &&
    req.body.password &&
    validEmail(req.body.email) &&
    validPassword(req.body.password)
  ) {
    const email = req.body.email;

    dbConnect.query(sql_login, email, (err, result) => {
      if (!result[0]) {
        console.log("Pas de compte trouvé" + err);
        res.status(400).json({
          message: "Pas de compte trouvé : Vérifiez votre email",
        });
      } else if (result && !result[1]) {
        bcrypt
          .compare(req.body.password, result[0].user_password)
          .then((valid) => {
            if (!valid) {
              console.log("Erreur de mot de passe");
              res.status(400).json({
                message:
                  "Pas de compatibilité entre votre email et votre mot de passe : Merci de les vérifier",
              });
            } else {
              console.log("Compte trouvé");

              delete result[0].user_password; //Ne pas envoyer le mot de passe au frontend
              result[0].user_lastconnect = Date.now(); //enregistre le timestamp de la connexion

              const token = jwt.sign(
                {
                  validUser: result[0].id_user,
                  statusUser: result[0].user_status,
                },
                process.env.GC_TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              );

              res.cookie("jwt", token); //! Envoi du token dans un cookie
              res.status(200).json(result[0]);
            }
          });
      } else if (result[1]) {
        console.log("Doublon dans les emails");
        res.status(500).json({
          message:
            "Impossibilité d'accès à votre compte : Merci de prévenir l'administrateur du site",
        });
      }
    });
  } else if (!validPassword(req.body.password) || !validEmail(req.body.email)) {
    return res.status(400).json({
      message: "Erreur de saisie: Vérifier votre email et votre mot de passe",
    });
  } else if (!req.body.email) {
    return res.status(400).json({
      message: "Merci de saisir un email pour accèder à votre compte",
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      message: "Merci de saisir un mot de passe pour accèder à votre compte",
    });
  }
};
//   UserModel.findOne({ email: req.body.email })
//     .then((user) => {
//       console.log(user);
//       if (!user) {
//         return res.status(401).json({ error: "Utilisateur non trouvé !" });
//       }
//       bcrypt
//         .compare(req.body.password, user.password)
//         .then((valid) => {
//           if (!valid) {
//             return res.status(401).json({ error: "Mot de passe incorrect !" });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//               expiresIn: "24h",
//             }),
//           });
//         })
//         .catch((error) => res.status(500).json({ error }));
//     })
//     .catch((error) => res.status(400).json({ error }));

// //! A exporter dans fichier js séparé :

//* REGEX : validation des données de la requête ----------------------------------

//* Test Email :*****************/
function validEmail(checkMail) {
  //! REGEX : uniquement les membres de groupomania
  let regexEmail = new RegExp(
    "^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$",
    "g"
  );
  let testEmail = regexEmail.test(checkMail);

  if (testEmail) {
    return true;
  } else {
    return false;
  }
}

//* Test Password:*****************/
const validPassword = (checkPass) => {
  let regexPass = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$",
    "g"
  );
  let testPass = regexPass.test(checkPass);

  if (testPass) {
    return true;
  } else {
    return false;
  }
};

//* Test Name:*****************/
const validName = (checkName) => {
  let regexName = new RegExp("^[A-Za-z--]{3,}$", "g");
  let testName = regexName.test(checkName);

  if (testName) {
    return true;
  } else {
    return false;
  }
};

//! Fin REGEX : validation des données de la requête----------------------------------

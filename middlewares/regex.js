//* REGEX : validation des données de la requête ----------------------------------

//* ################  Test Email :*****************/
exports.validEmail = (checkMail) => {
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
};

//* ################  Test Password:*****************/
exports.validPassword = (checkPass) => {
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

//* ################  Test Name:*****************/
exports.validName = (checkName) => {
  let regexName = new RegExp("^[A-Za-z--]{3,}$", "g");
  let testName = regexName.test(checkName);

  if (testName) {
    return true;
  } else {
    return false;
  }
};

//* ################  Test Number:*****************/
exports.validNumeric = (checkNumber) => {
  let regexNumeric = new RegExp("^[0-9]{1,}$", "g");
  let testNumeric = regexNumeric.test(checkNumber);

  if (testNumeric) {
    return true;
  } else {
    return false;
  }
};

//* ################  Test Text (for paragraph):*****************/
exports.validText = (checkText) => {
  let regexText = new RegExp("^[A-Za-z0-9-@#$%^€,;s)(&+=.-_*]{3,}$", "g");
  let testText = regexText.test(checkText);

  if (testText) {
    return true;
  } else {
    return false;
  }
};
//! Fin REGEX : validation des données de la requête----------------------------------
//!
//!
//!
//!
//!
//!
//!
//!
//! TEST REGEX EN MIDDLEWARE : Quelques soit la requête si des datas sont à vérifier ----------------------------------

// module.exports = (req, res, next) => {
//   //* ################  Test Email :*****************/
//   //! EMAIL SPECIFIQUE AU PROJET 7 : xxxxx@groupomania.xx(x)
//   let regexEmail = new RegExp(
//     "^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$",
//     "g"
//   );

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   let testEmail;

//   if (req.body.email) {
//     testEmail = regexEmail.test(req.body.email.trim());
//   }

//   //* ################  Test Password:*****************/
//   let regexPass = new RegExp(
//     "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$",
//     "g"
//   );

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   let testPass;
//   if (req.body.password) {
//     testPass = regexPass.test(req.body.password.trim());
//   }

//   //* ################  Test Name:*****************/
//   let regexName = new RegExp("^[A-Za-z--]{3,}$", "g");

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   let testFirstName;
//   let testLastName;

//   if (req.body.firstname) {
//     testFirstName = regexName.test(req.body.firstname.trim());
//   }
//   if (req.body.lastname) {
//     testLastName = regexName.test(req.body.lastname.trim());
//   }

//   //* ################  Test Number:*****************/
//   let regexNumeric = new RegExp("^[0-9]{1,}$", "g");

//   //Enumeration des req.body.xxx possible et association aux tests correspondants

//   let testId_Job;

//   if (req.body.id_job) {
//     testId_Job = regexNumeric.test(req.body.id_job.trim());
//   }

//   //* ################  Test Text (for paragraph):*****************/
//   let regexText = new RegExp("^[A-Za-z0-9-@#$%^€,;s)(&+=.-_*]{3,}$", "g");

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   //
//   //
//   //
//   //
//   //
//   //* ################ ! Test Phone : ******************************/
//   let regexPhone = new RegExp(
//     "^(?:0|+33 ?|0?0?33 ?|)([1-9]{1})([.]{0,1})([0-9]{2})([.]{0,1})([0-9]{2})([.]{0,1})([0-9]{2})([.]{0,1})([0-9]{2})([.]{0,1})$",
//     "g"
//   );

//   let testPhone;

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   if (req.body.phone) {
//     testPhone = regexPhone.test(req.body.phone.trim());
//   }

//   //* ################ Test Correct Date : Timestamp or yyyy-mm-dd hour:min:sec or yyyy-mm-dd ****************/

//   let regexDayAndHour = new RegExp(
//     "^([0-9]{4})[-]([0][1-9]|[1][1|2])[-]([0-2][0-9]|[3][0|1])[s]([0|1][0-9]|[2][0-3])([:][0-5][0-9]){2}$",
//     "g"
//   );
//   let regexOnlyDay = new RegExp(
//     "^([0-9]{4})[-]([0][1-9]|[1][1|2])[-]([0-2][0-9]|[3][0|1])$",
//     "g"
//   );
//   let regexTimestamp = new RegExp("^([-]){0,1}([0-9]){1,}$", "g");

//   //Enumeration des req.body.xxx possible et association aux tests correspondants
//   let testCorrectDate;

//   if (req.body.age) {
//     let testDayAndHour = regexDayAndHour.test(req.body.age.trim());
//     let testOnlyDay = regexOnlyDay.test(req.body.age.trim());
//     let testTimestamp = regexTimestamp.test(req.body.age.trim());
//     if (testDayAndHour) {
//       testCorrectDate = regexDayAndHour.test(req.body.age.trim());
//     } else if (testOnlyDay) {
//       testCorrectDate = regexOnlyDay.test(req.body.age.trim());
//     } else if (testTimestamp) {
//       testCorrectDate = regexTimestamp.test(req.body.age.trim());
//     }
//   }

//   // //* ######## Compare req only if it exists ###########

//   // let phone;
//   // let email;
//   // let password;
//   // let date;
//   // let firstName;
//   // let lastName;
//   // let idJob;

//   // if (typeof testPhone == "undefined") {
//   //   phone = "x";
//   // } else {
//   //   phone = testPhone;
//   // }
//   // if (typeof testEMail == "undefined") {
//   //   email = "x";
//   // } else {
//   //   email = testEmail;
//   // }
//   // if (typeof testPass == "undefined") {
//   //   password = "x";
//   // } else {
//   //   password = testPass;
//   // }
//   // if (typeof testCorrectDate == "undefined") {
//   //   date = "x";
//   // } else {
//   //   date = testCorrectDate;
//   // }
//   // if (typeof testFirstName == "undefined") {
//   //   firstName = "x";
//   // } else {
//   //   firstName = testFirstName;
//   // }
//   // if (typeof testLastName == "undefined") {
//   //   lastName = "x";
//   // } else {
//   //   lastName = testLastName;
//   // }
//   // if (typeof testId_Job !== "undefined") {idJob = testId_Job};

//   //* ######### Go next() or return Error message: ##########

//   if (
//     (typeof testPhone == "undefined" || testPhone == true) &&
//     (typeof testEmail == "undefined" || testEmail == true) &&
//     (typeof testPass == "undefined" || testPass == true) &&
//     (typeof testCorrectDate == "undefined" || testCorrectDate == true) &&
//     (typeof testFirstName == "undefined" || testFirstName == true) &&
//     (typeof testLastName == "undefined" || testLastName == true) &&
//     (typeof testId_Job == "undefined" || testId_Job == true)
//   ) {
//     next();
//   } else if (testPhone == false) {
//     res.statut(400).json({
//       message:
//         "Le numéro de téléphone est incorrect. Format autorisé : 0X.XX.XX.XX.XX",
//     });
//   } else if (testEmail == false) {
//     res.statut(400).json({
//       message:
//         "E-mail non valide : doit contenir une adresse de type : #prenom#@groupomania.xx(x) ",
//     });
//   } else if (testPass == false) {
//     res.statut(400).json({
//       message:
//         "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères",
//     });
//   } else if (testCorrectDate == false) {
//     res.statut(400).json({
//       message:
//         "La date saisie ne correspond pas au format demandé (jj/mm/aaaa) ou n'existe pas",
//     });
//   } else if (testFirstName == false) {
//     res.statut(400).json({
//       message:
//         "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
//     });
//   } else if (testLastName == false) {
//     res.statut(400).json({
//       message:
//         "Votre nom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
//     });
//   } else if (testId_Job == false) {
//     res.statut(400).json({
//       message: "Merci de sélectionner votre poste au sein de l'entreprise",
//     });
//   }
// };

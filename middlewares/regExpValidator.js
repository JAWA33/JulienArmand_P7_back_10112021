const regExpValidator = (req, res, next) => {
  //* ################  Test Email :*****************/
  //! EMAIL SPECIFIQUE AU PROJET 7 : xxxxx@groupomania.xx(x)
  let regexEmail = new RegExp(
    "^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$",
    "g"
  );

  //Affect test to element if element exists :
  let testEmail;
  req.body.email ? (testEmail = regexEmail.test(req.body.email.trim())) : "";

  //* ################  Test Password:*****************/
  let regexPass = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$",
    "g"
  );

  //Affect test to element if element exists :
  let testPass;
  req.body.password
    ? (testPass = regexPass.test(req.body.password.trim()))
    : "";

  //* ################  Test Name:*****************/
  let regexName = new RegExp("^[A-Za-z--]{3,}$", "g");

  //Affect test to element if element exists :
  let testFirstName;
  let testLastName;
  req.body.firstname
    ? (testFirstName = regexName.test(req.body.firstname.trim()))
    : "";
  req.body.lastname
    ? (testLastName = regexName.test(req.body.lastname.trim()))
    : "";

  //* ################  Test Number:*****************/
  let regexNumeric = new RegExp("^[0-9]{1,}$", "g");

  //Affect test to element if element exists :
  let testId_Job;
  req.body.id_job
    ? (testId_Job = regexNumeric.test(req.body.id_job.trim()))
    : "";

  //* ################  Test Text (for paragraph):*****************/
  let regexText = new RegExp("^[A-Za-z0-9-@#$%^€,;s)(&+=.-_*]{3,}$", "g");

  //Enumeration des req.body.xxx possible et association aux tests correspondants
  //
  //
  //
  //
  //
  //* ################ ! Test Phone : 0X.XX.XX.XX.XX ou 0XXXXXXXXX ******************************/
  let regexPhone = new RegExp(
    "^[0][1-9][.][0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}$",
    "g"
  );
  let testPhone;
  req.body.phone ? (testPhone = regexPhone.test(req.body.phone.trim())) : "";

  //* ##### Test Correct Date : Timestamp or yyyy-mm-dd hour:min:sec or yyyy-mm-dd ****************/

  let regexDayAndHour = new RegExp( //! ERREUR SUR REGEXP :::: Espace non valide à voir
    `^([0-9]{4})[-]([0][1-9]|[1][0-2])[-]([0-1-2][0-9]|[3][0|1])[\s]([0-1][0-9]|[2][0-3])$`,

    "g"
  );
  let regexOnlyDay = new RegExp( //OK
    "^([0-9]{4})[-]([0][1-9]|[1][0-2])[-]([0-1-2][0-9]|[3][0|1])$",
    "g"
  );
  let regexTimestamp = new RegExp("^([-]){0,1}([0-9]){1,}$", "g"); //OK

  //Enumeration des req.body.xxx possible et association aux tests correspondants
  let testAge_DayAndHour;
  let testAge_OnlyDay;
  let testAge_Timestamp;

  req.body.age
    ? (testAge_DayAndHour = regexDayAndHour.test(req.body.age.trim()))
    : "";
  req.body.age
    ? (testAge_OnlyDay = regexOnlyDay.test(req.body.age.trim()))
    : "";
  req.body.age
    ? (testAge_Timestamp = regexTimestamp.test(req.body.age.trim()))
    : "";

  console.log(testAge_DayAndHour);
  console.log(testAge_OnlyDay);
  console.log(testAge_Timestamp);

  //* ######### Go next() or return Error message: ##########

  if (
    (typeof testPhone == "undefined" || testPhone == true) &&
    (typeof testEmail == "undefined" || testEmail == true) &&
    (typeof testPass == "undefined" || testPass == true) &&
    (typeof testAge_DayAndHour == "undefined" ||
      testAge_DayAndHour == true ||
      typeof testAge_OnlyDay == "undefined" ||
      testAge_OnlyDay == true ||
      typeof testAge_Timestamp == "undefined" ||
      testAge_Timestamp == true) &&
    (typeof testFirstName == "undefined" || testFirstName == true) &&
    (typeof testLastName == "undefined" || testLastName == true) &&
    (typeof testId_Job == "undefined" || testId_Job == true)
  ) {
    res.status(200).json({ message: "Format des données valides" });
    next();
  } else if (testPhone == false) {
    res.status(400).json({
      message:
        "Le numéro de téléphone est incorrect. Format autorisé : 0X.XX.XX.XX.XX",
    });
  } else if (testEmail == false) {
    res.status(400).json({
      message:
        "E-mail non valide : doit contenir une adresse de type : #prenom#@groupomania.xx(x) ",
    });
  } else if (testPass == false) {
    res.status(400).json({
      message:
        "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères",
    });
  } else if (
    testAge_DayAndHour == false &&
    testAge_OnlyDay == false &&
    testAge_Timestamp == false
  ) {
    res.status(400).json({
      message:
        "La date saisie ne correspond pas au format demandé (jj/mm/aaaa) ou n'existe pas",
    });
  } else if (testFirstName == false) {
    res.status(400).json({
      message:
        "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
    });
  } else if (testLastName == false) {
    res.status(400).json({
      message:
        "Votre nom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
    });
  } else if (testId_Job == false) {
    res.status(400).json({
      message:
        "Merci de sélectionner votre service et votre poste au sein de l'entreprise",
    });
  }
};

module.exports = regExpValidator;

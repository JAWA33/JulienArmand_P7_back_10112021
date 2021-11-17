//* REGEX : validation des données de la requête ----------------------------------

//* Test Email :*****************/
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

//* Test Password:*****************/
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

//* Test Name:*****************/
exports.validName = (checkName) => {
  let regexName = new RegExp("^[A-Za-z--]{3,}$", "g");
  let testName = regexName.test(checkName);

  if (testName) {
    return true;
  } else {
    return false;
  }
};

//! Fin REGEX : validation des données de la requête----------------------------------

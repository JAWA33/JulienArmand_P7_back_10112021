const regExpValidator = (req, res, next) => {
  //* CREATION DES VARIABLES NECESSAIRES ######################################

  /*! //! Ajoutez ici les éléments à tester issu de la requête : req.body.xxx, 
      //! associés avec la regex à appliquer : _maregex (pensez à vérifer si elle existe ou si elle correspond à ce que vous souhaitez valider)
      //! et le message d'erreur que vous souhaitez voir apparaitre : "mon message d'erreur"
      //! format: ["xxx","_maregex","mon message d'erreur"]
  */

  let test = [
    [
      "password",
      "_password",
      "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères",
    ],
    [
      "email",
      "_email",
      "Votre e-mail doit contenir une adresse de type : #prenom#@groupomania.xx(x) ",
    ],
    [
      "firstname",
      "_name",
      "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les prénoms composés vous pouvez utiliser un -",
    ],
    [
      "lastname",
      "_name",
      "Votre nom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
    ],
    [
      "id_job",
      "_id",
      "Merci de sélectionner votre service et votre poste au sein de l'entreprise",
    ],
    ["id_user", "_id", "Le format de la donnée 'id' ne correspond pas"],
    ["id_post", "_id", "Le format de la donnée 'id' ne correspond pas"],
    ["id_sender", "_id", "Le format de la donnée 'id' ne correspond pas"],
    ["id_recipient", "_id", "Le format de la donnée 'id' ne correspond pas"],
    [
      "bio",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "skill",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "hobbie",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "post_text",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "comment_text",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "instantcom_message",
      "_paragraph",
      "Votre texte comporte moins de 3 caractères ou des caractères qui ne sont pas autorisés",
    ],
    [
      "phone",
      "_phone",
      "Le numéro de téléphone est incorrect. Format autorisé : 0X.XX.XX.XX.XX ou 0XXXXXXXXX",
    ],
    [
      "age",
      "_date",
      "La date saisie n'a pas le bon format YYYY-MM-DD ou n'existe pas",
    ],
    ["url_image", "_url_image", "L'URL de votre image n'est pas correcte"],
    [
      "read",
      "_trueOrFalse",
      " La valeur envoyée ne peut être que 'true' ou 'false'",
    ],
  ];

  let compare = [];
  let regex = [];
  let requete = [];

  for (i = 0; i < test.length; i++) {
    let x = eval("var test_" + test[i][0] + " ;");
    compare.push(x);

    let y = eval("let regex" + test[i][1] + " ;");
    regex.push(y);

    let z = eval("req.body." + test[i][0]);
    requete.push(z);
  }

  //* DEFINITION DES REGEXP #####################################################
  //! Vérifer si la Regexp existe ou si elle correspond à ce que vous souhaitez valider, ou ajouter une nouvelle :
  //
  //
  //? Regex de type password : ############################# //
  regex_password = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$"
  );

  //? Regex de type Email : ############################# //
  //! EMAIL  SPECIFIQUE AU PROJET 7 : xxxxx@groupomania.xx(x)
  regex_email = new RegExp("^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$");

  //? Regex de type "nom" : 3 lettres mini, pas de chiffre ni caractères spéciaux sauf "-" ############## //
  regex_name = new RegExp("^[A-Za-z-]{3,}$");

  //? Regex de type numérique : uniquement des nombres positifs ############################# //
  regex_id = new RegExp("^[0-9]{1,}$");

  //? Regex de type paragraphe : ############################# //
  // Mini 3 caractères,autorise: lettres, chiffres et certains caractères spéciaux, exclusion : / et ' et _
  regex_paragraph = new RegExp("^[A-Za-zéè0-9-@#$%^€,;!?' )(&+=.-:\n\t]{3,}$");

  //? Regex de type téléphone (France) : ############################# //
  // Format : 0X.XX.XX.XX.XX ou OXXXXXXXXX :
  regex_phone = new RegExp(
    "^[0][1-9][.][0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}$"
  );

  //? Regex de type date (date) : YYYY-MM-DD ############################# //
  regex_date = new RegExp(
    "^([0-9]{4})[-]([0][1-9]|[1][0-2])[-]([0-1-2][0-9]|[3][0|1])$"
  );

  //? Regex de type url_image ############################# //
  regex_url_image = new RegExp(
    "^http[s]{0,1}[:][/]{2}[0-9a-zA-Z:./-_]{5,}[/]images[/][0-9a-zA-Z:./_-]{5,}[.][a-zA-Z]{3,4}$"
  );

  //? Regex de type true or false ############################# //
  regex_trueOrFalse = new RegExp("^true|false$");

  //* VERFICATION SI PRESENT DANS LA REQUETE : #########################################################//

  // Affectation des résultats aux variables de test existant dans un nouveau tableau Allresults:
  let allResults = [];

  for (k = 0; k < compare.length; k++) {
    if (typeof requete[k] != "undefined") {
      compare[k] = eval("regex" + test[k][1]).test(requete[k].trim());
      allResults.push([test[k][1], compare[k], test[k][2]]);
    }
  }

  //* ENVOI DES COMMENTAIRES OU NEXT(): ##########################################################################//

  // Affichage dans la console des tests et des résultats effectués (peut-être désactivé : mise en commentaires):
  console.log("############# Tested requests : ############# ");
  for (t = 0; t < allResults.length; t++) {
    console.log("Test" + allResults[t][0] + ": " + allResults[t][1]);
  }
  console.log("#############  End of Tests : ############# ");

  let errorComments = [];
  for (u = 0; u < allResults.length; u++) {
    if (allResults[u][1] === false) {
      errorComments.push(
        allResults[u][0].split("_")[1] + " :: " + allResults[u][2]
      );
    }
  }

  if (errorComments.length === 0) {
    console.log("Toutes les données sont validées");
    next();
  } else if (errorComments.length !== 0) {
    console.log("Vos données comportent des erreurs");
    res.status(400).json({
      regexpError: errorComments,
    });
  }
};
module.exports = regExpValidator;

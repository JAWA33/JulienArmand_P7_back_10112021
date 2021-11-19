const regExpValidator = (req, res, next) => {
  //console.log(Date.now());

  //* ####### --- CREATION DE TOUS LES VARIABLES DE TEST ------ ############################################################################################## //
  const k = "test_";

  //! Etape 1 : Ajout ici les éléments à tester issu de la requête : req.body.xxx //
  let test = [
    (password = 1),
    (email = 100),
    (firstname = 200),
    (lastname = 201),
    (id_job = 300),
    (id_user = 301),
    (id_post = 302),
    (id_sender = 303),
    (id_recipient = 304),
    (bio = 400),
    (skill = 401),
    (hobbie = 402),
    (post_text = 403),
    (comment_text = 404),
    (instantcom_message = 405),
    (phone = 500),
    (age = 600),
    (url_image = 700),
    (read = 800),
    //ex: (xxx = 601),
  ];

  let i = 0;

  for (i = 0; i < test.length; i++) {
    eval("var " + k + test[i] + " ;");
  }
  //
  //* ####### --- LISTING DES DIFFERENTES REGEX A APPLIQUER ---- ########################################################################### //

  //! Etape 2 : Ajouter ou utiliser une Regex (après vérification)//
  //? Regex de type Password : ########################### // (test compris entre 0 à 99)
  // EMAIL  SPECIFIQUE AU PROJET 7 : xxxxx@groupomania.xx(x)
  const regex_password = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$"
  );

  //? Regex de type Email : ############################# // (De 100 à 199)
  const regex_email = new RegExp("^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$");

  //? Regex de type "nom" : 3 lettres mini, pas de chiffre ni caractères spéciaux sauf "-" ############## // (De 200 à 299)
  const regex_name = new RegExp("^[A-Za-z-]{3,}$");

  //? Regex de type numérique : uniquement des nombres positifs ############################# // (De 300 à 399)
  const regex_id = new RegExp("^[0-9]{1,}$", "g");

  //? Regex de type paragraphe : ############################# // (De 400 à 499)
  // Mini 3 caractères,autorise: lettres, chiffres et certains caractères spéciaux, exclusion : / et ' et _
  const regex_paragraph = new RegExp("^[A-Za-z0-9-@#$%^€,;!? )(&+=.-:]{3,}$");

  //? Regex de type téléphone (France) : ############################# // (De 500 à 599)
  // Format : 0X.XX.XX.XX.XX ou OXXXXXXXXX :
  const regex_phone = new RegExp(
    "^[0][1-9][.][0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}$"
  );

  //? Regex de type date (date) : YYYY-MM-DD ############################# // (De 600 à 699)
  const regex_date = new RegExp(
    "^([0-9]{4})[-]([0][1-9]|[1][0-2])[-]([0-1-2][0-9]|[3][0|1])$"
  );

  //? Regex de type url_image ############################# // (De 700 à 799)
  const regex_url_image = new RegExp(
    "^http[s]{0,1}[:][/]{2}[0-9a-zA-Z:./-_]{5,}[/]images[/][0-9a-zA-Z:./_-]{5,}[.][a-zA-Z]{3,4}$"
  );

  //? Regex de type true or false ############################# // (De 800 à 899)
  const regex_trueOrFalse = new RegExp("^true|false$");

  //
  //* ####### --- ATTRIBUTION DES TESTS si la variable est dans la requête ---- ############################################################## //

  //! Etape 3 : Affecter le test si la req.body.xxxx existe avec la regex corresponsdante :

  //? Test Password:*****************/(test compris entre 0 à 99)

  req.body.password
    ? (test_1 = regex_password.test(req.body.password.trim()))
    : "";
  //

  //? Test Email :*****************/(test compris entre 100 à 199)

  req.body.email ? (test_100 = regex_email.test(req.body.email.trim())) : "";
  //

  //? Test Name:*****************/ (test compris entre 200 à 299)
  req.body.firstname
    ? (test_200 = regex_name.test(req.body.firstname.trim()))
    : "";
  req.body.lastname
    ? (test_201 = regex_name.test(req.body.lastname.trim()))
    : "";
  //

  //? Test Number:*****************/(test compris entre 300 à 399)
  req.body.id_job ? (test_300 = regex_id.test(req.body.id_job.trim())) : "";
  req.body.id_user ? (test_301 = regex_id.test(req.body.id_user.trim())) : "";
  req.body.id_post ? (test_302 = regex_id.test(req.body.id_post.trim())) : "";
  req.body.id_sender
    ? (test_303 = regex_id.test(req.body.id_sender.trim()))
    : "";
  req.body.id_recipient
    ? (test_304 = regex_id.test(req.body.id_recipient.trim()))
    : "";
  //

  //? Test Text (for paragraph):*****************/(test compris entre 400 à 499)
  req.body.bio ? (test_400 = regex_paragraph.test(req.body.bio.trim())) : "";
  //
  req.body.skill
    ? (test_401 = regex_paragraph.test(req.body.skill.trim()))
    : "";
  //
  req.body.hobbie
    ? (test_402 = regex_paragraph.test(req.body.hobbie.trim()))
    : "";
  req.body.post_text
    ? (test_403 = regex_paragraph.test(req.body.post_text.trim()))
    : "";
  req.body.comment_text
    ? (test_404 = regex_paragraph.test(req.body.comment_text.trim()))
    : "";
  req.body.instantcom_message
    ? (test_405 = regex_paragraph.test(req.body.instantcom_message.trim()))
    : "";
  //

  //? Test Phone : 0X.XX.XX.XX.XX ou 0XXXXXXXXX ***************/ (test compris entre 500 à 599)
  req.body.phone ? (test_500 = regex_phone.test(req.body.phone.trim())) : "";
  //

  //? Test Correct Date : ****************/ (test compris entre 600 à 699)
  req.body.age ? (test_600 = regex_date.test(req.body.age.trim())) : "";

  //? Test url pour images : ****************/ (test compris entre 700 à 799)
  req.body.url_image
    ? (test_700 = regex_url_image.test(req.body.url_image.trim()))
    : "";
  //

  //? Test True or false : ****************/ (test compris entre 800 à 899)
  req.body.read
    ? (test_800 = regex_trueOrFalse.test(req.body.read.trim()))
    : "";
  //
  //
  //

  //* ######### Go next() or return Error message: ##########################################################################//

  //! 0ption : Ajouter votre test pour qu'il apparaisse dans la console :
  console.log("GO testing");
  console.log("Test_1   : " + test_1);
  console.log("Test_100 : " + test_100);
  console.log("Test_200 : " + test_200);
  console.log("Test_201 : " + test_201);
  console.log("Test_300 : " + test_300);
  console.log("Test_301 : " + test_301);
  console.log("Test_302 : " + test_302);
  console.log("Test_303 : " + test_303);
  console.log("Test_304 : " + test_304);
  console.log("Test_400 : " + test_400);
  console.log("Test_401 : " + test_401);
  console.log("Test_402 : " + test_402);
  console.log("Test_403 : " + test_403);
  console.log("Test_404 : " + test_404);
  console.log("Test_405 : " + test_405);
  console.log("Test_500 : " + test_500);
  console.log("Test_600 : " + test_600);
  console.log("Test_700 : " + test_700);
  console.log("Test_800 : " + test_800);

  //! Etape 4 : Ajouter le nouveau test xxx si validé : (typeof test_xxx == "undefined" || test_xxx == true)
  const goTesting = () => {
    if (
      (typeof test_1 == "undefined" || test_1 === true) &&
      (typeof test_100 == "undefined" || test_100 === true) &&
      (typeof test_200 == "undefined" || test_200 === true) &&
      (typeof test_201 == "undefined" || test_201 === true) &&
      (typeof test_300 == "undefined" || test_300 === true) &&
      (typeof test_301 == "undefined" || test_301 === true) &&
      (typeof test_302 == "undefined" || test_302 === true) &&
      (typeof test_303 == "undefined" || test_303 === true) &&
      (typeof test_304 == "undefined" || test_304 === true) &&
      (typeof test_400 == "undefined" || test_400 === true) &&
      (typeof test_401 == "undefined" || test_401 === true) &&
      (typeof test_402 == "undefined" || test_402 === true) &&
      (typeof test_403 == "undefined" || test_403 === true) &&
      (typeof test_404 == "undefined" || test_404 === true) &&
      (typeof test_405 == "undefined" || test_405 === true) &&
      (typeof test_500 == "undefined" || test_500 === true) &&
      (typeof test_600 == "undefined" || test_600 === true) &&
      (typeof test_700 == "undefined" || test_700 === true) &&
      (typeof test_800 == "undefined" || test_800 === true)
    ) {
      console.log("Format des données valides");
      next();
    } else if (test_1 === false) {
      //! Etape 5 : Ajouter la réponse souhaitée si la Regex n'est pas validée, soit générique soit spécifique :
      //(test compris entre 0 à 99)
      res.status(400).json({
        message:
          "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères",
      });
    } else if (test_100 === false) {
      //(test compris entre 100 à 199)
      res.status(400).json({
        message:
          "E-mail non valide : doit contenir une adresse de type : #prenom#@groupomania.xx(x) ",
      });
    } else if (test_200 === false) {
      //(test compris entre 200 à 299)
      res.status(400).json({
        message:
          "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les prénoms composés vous pouvez utiliser un -",
      });
    } else if (test_201 === false) {
      res.status(400).json({
        message:
          "Votre nom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les noms composés vous pouvez utiliser un -",
      });
    } else if (test_300 === false) {
      //(test compris entre 300 à 399)
      res.status(400).json({
        message:
          "Merci de sélectionner votre service et votre poste au sein de l'entreprise",
      });
    } else if (
      test_301 === false ||
      test_302 === false ||
      test_303 === false ||
      test_304 === false
    ) {
      //(test compris entre 300 à 399)
      res.status(400).json({
        message: "Le format de la donnée 'id' ne correspond pas",
      });
    } else if (
      test_400 === false ||
      test_401 === false ||
      test_402 === false ||
      test_403 === false ||
      test_404 === false ||
      test_405 === false
    ) {
      //(test compris entre 400 à 499)
      res.status(400).json({
        message: "Votre texte comporte des éléments qui ne sont pas autorisés",
      });
    } else if (test_500 === false) {
      res.status(400).json({
        message:
          "Le numéro de téléphone est incorrect. Format autorisé : 0X.XX.XX.XX.XX ou 0XXXXXXXXX",
      });
    } else if (test_600 === false) {
      res.status(400).json({
        message:
          "La date saisie n'a pas le bon format YYYY-MM-DD ou n'existe pas",
      });
    } else if (test_700 === false) {
      res.status(400).json({
        message: "L'URL de votre image n'est pas correcte",
      });
    } else if (test_800 === false) {
      res.status(400).json({
        message: " La valeur envoyée ne peut être que 'true' ou 'false'",
      });
    }
  };

  goTesting();
};

module.exports = regExpValidator;

const dbConnect = require("../database/dbConnect.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sqlReq = require("../utils/sqlRequest.js");
dotenv.config({ path: "../.env" });

//* R : ######### POST GET ALL : Select all posts data (get)###########

exports.getAllPosts = (req, res) => {
  dbConnect.query(sqlReq.allPosts, (err, result) => {
    if (err) {
      console.log("Erreur " + err);
    } else {
      res.status(201).json(result);
    }
  });
};

//* C : ######### POST CREATE : Create a new post (get)###########
/* request format : {
    "post_text":"Je raconte ma vie",
})
*/

exports.createPost = (req, res) => {
  if (req.cookies.jwt && req.body.post_text) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const post_text = req.body.post_text;

    const url_image = req.file
      ? `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}`
      : null;

    dbConnect.query(
      sqlReq.createPost,
      [post_text, url_image, id_user],
      (err) => {
        console.log(post_text);
        console.log(url_image);
        console.log(id_user);

        if (err) {
          console.log("Erreur dans les données" + err);
          res.status(500).json({
            message:
              "Erreur dans la transmission des données : Merci de recommencer votre post",
          });
        } else {
          console.log("Post créé");
          res.status(201).json({
            message: "Votre post a été créé",
          });
        }
      }
    );
  } else if (!req.body.post_text) {
    return res.status(400).json({
      message: "Votre post ne peut être créé sans texte associé",
    });
  }
};

//* U : ######### POST UPDATE : Update one post (get)###########
/* request format : {
    "post_text":"Je raconte ma vie",
})
*/

exports.updatePost = (req, res) => {};

exports.deletePost = (req, res) => {};

exports.like = (req, res) => {};

exports.userLike = (req, res) => {};

exports.countLikes = (req, res) => {};

exports.dislike = (req, res) => {};

exports.comment = (req, res) => {};

exports.getComments = (req, res) => {};

exports.updateComment = (req, res) => {};

exports.deleteComment = (req, res) => {};

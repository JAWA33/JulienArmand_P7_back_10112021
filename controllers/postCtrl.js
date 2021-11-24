const dbConnect = require("../database/dbConnect.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sqlReq = require("../utils/sqlRequest.js");
dotenv.config({ path: "../.env" });

//! #################### POSTS ###################### //
//
//* R : ######### POST GET ALL : Select all posts data (get)###########

exports.getAllPosts = (req, res) => {
  if (req.cookies.jwt) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;

    dbConnect.query(sqlReq.allPosts, [id_user, id_user], (err, result) => {
      if (err) {
        console.log("Erreur" + err);
      } else {
        res.status(200).json(result);
      }
    });
  }
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
    Si elle existe déjà : "url_image" :"Mon url existante",
})
*/

exports.updatePost = (req, res) => {
  if (req.cookies.jwt && req.body.post_text && req.params.idpost) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const post_text = req.body.post_text;
    const id_post = req.params.idpost;
    let url_image;
    if (req.body.url_image) {
      url_image = req.body.url_image;
    } else {
      url_image = req.file
        ? `${req.protocol}://${req.get("host")}/images/posts/${
            req.file.filename
          }`
        : null;
    }

    dbConnect.query(
      sqlReq.updatePost,
      [post_text, url_image, id_user, id_post],
      (err) => {
        if (err) {
          console.log("Erreur dans les données" + err);
          res.status(500).json({
            message: "Erreur de la mise à jour : Merci de recommencer",
          });
        } else {
          console.log("Post mis à jour");
          res.status(201).json({
            message: "Votre post a été mis à jour",
          });
        }
      }
    );
  } else if (!req.body.post_text) {
    return res.status(400).json({
      message: "Votre post ne peut être mis à jour sans texte associé",
    });
  }
};

//* D : ######### POST DELETE : Delete one post made by user (delete)###########
//! A voir pour suppression des likes et comments en même temps ????
exports.deletePost = (req, res) => {
  if (req.cookies.jwt && req.params.idpost) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const id_post = req.params.idpost;

    dbConnect.query(sqlReq.deletePost, [id_user, id_post], (err) => {
      if (err) {
        console.log("Erreur dans les données" + err);
        res.status(500).json({
          message: "Echec de la suppression : Merci de recommencer",
        });
      } else {
        console.log("Post supprimé");
        res.status(201).json({
          message: "Votre post a été supprimé",
        });
      }
    });
  }
};
//

//! #################### LIKES ###################### //

//
//* C : ######### LIKER POST : Like post by id post and user (post)###########

exports.like = (req, res) => {
  if (req.cookies.jwt && req.params.idpost) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const id_post = req.params.idpost;

    dbConnect.query(sqlReq.like, [id_post, id_user], (err) => {
      if (err) {
        console.log("Erreur dans les données" + err);
        res.status(500).json({
          message: "Erreur dans le like : Merci de recommencer",
        });
      } else {
        console.log("Like du post");
        res.status(201).json({
          message: "Vous avez liké ce post",
        });
      }
    });
  }
};

//* D : ######### DISLIKE POST : Dislike post by id post and user (delete)###########

exports.dislike = (req, res) => {
  if (req.cookies.jwt && req.params.idpost) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const id_post = req.params.idpost;

    dbConnect.query(sqlReq.dislike, [id_post, id_user], (err) => {
      if (err) {
        console.log("Erreur dans les données" + err);
        res.status(500).json({
          message: "Erreur dans le dislike : Merci de recommencer",
        });
      } else {
        console.log("Dislike du post");
        res.status(201).json({
          message: "Vous avez disliké ce post",
        });
      }
    });
  }
};
//

//! #################### COMMENTS ###################### //

//* C : ########### COMMENT POST : Make a comment on a post by id_post and id_user (post)########
/* request format : {
    "comment_text":"Je fais mon commentaire"
})
*/

exports.comment = (req, res) => {
  if (req.cookies.jwt && req.body.comment_text && req.params.idpost) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const comment_text = req.body.comment_text;
    const id_post = req.params.idpost;

    dbConnect.query(sqlReq.comment, [comment_text, id_post, id_user], (err) => {
      if (err) {
        console.log("Erreur dans les données" + err);
        res.status(500).json({
          message:
            "Erreur dans la création du commentaire : Merci de recommencer",
        });
      } else {
        console.log("Commentaire créé");
        res.status(201).json({
          message: "Votre commentaire a été créé",
        });
      }
    });
  } else if (!req.body.comment_text) {
    return res.status(400).json({
      message: "Votre commentaire ne peut être créé sans texte associé",
    });
  }
};

//* R : ######### COMMENTS GET ALL : Select all comments for a post by id_post (get)###########

exports.getComments = (req, res) => {
  if (req.params.idpost) {
    const id_post = req.params.idpost;

    dbConnect.query(sqlReq.getComments, id_post, (err, result) => {
      if (err) {
        console.log("Erreur " + err);
      } else {
        res.status(201).json(result);
      }
    });
  }
};

//* U ########### UPDATE COMMENT : Update one comment by id_user and id_comment (update)############
/* request format : {
    "comment_text":"Je fais mon commentaire"
})
*/

exports.updateComment = (req, res) => {
  if (req.cookies.jwt && req.body.comment_text && req.params.idcomment) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const comment_text = req.body.comment_text;
    const id_comment = req.params.idcomment;

    dbConnect.query(
      sqlReq.updateComment,
      [comment_text, id_user, id_comment],
      (err) => {
        if (err) {
          console.log("Erreur dans les données" + err);
          res.status(500).json({
            message: "Erreur de la mise à jour : Merci de recommencer",
          });
        } else {
          console.log("Commentaire mis à jour");
          res.status(201).json({
            message: "Votre commentaire a été mis à jour",
          });
        }
      }
    );
  } else if (!req.body.comment_text) {
    return res.status(400).json({
      message: "Votre commentaire ne peut être mis à jour sans texte associé",
    });
  }
};

//* D : ########### DELETE COMMENT : Delete a comment by id_comment and id_user (delete)########

exports.deleteComment = (req, res) => {
  if (req.cookies.jwt && req.params.idcomment) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;
    const id_comment = req.params.idcomment;

    dbConnect.query(sqlReq.deleteComment, [id_user, id_comment], (err) => {
      if (err) {
        console.log("Erreur dans les données" + err);
        res.status(500).json({
          message:
            "Erreur dans la suppresion du commentaire : Merci de recommencer",
        });
      } else {
        console.log("Comment deleted");
        res.status(201).json({
          message: "Votre commentaire a été supprimé",
        });
      }
    });
  }
};

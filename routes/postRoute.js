const express = require("express");
const authorize = require("../middlewares/authorize.js");
const regExp = require("../middlewares/regExpValidator.js");
const multerToPost = require("../middlewares/multerToPost.js");

const postCtrl = require("../controllers/postCtrl.js");

const router = express.Router();

router.post("/create", authorize, regExp, multerToPost, postCtrl.createPost); //C
router.get("/all", authorize, postCtrl.getAllPosts); //R
router.put(
  "/update/:idpost",
  authorize,
  regExp,
  multerToPost,
  postCtrl.updatePost
); //U
router.delete("/delete/:idpost", authorize, postCtrl.deletePost); //D
//! A compléter avec suppression de l'image (multer)lors de delete post

router.get("/like/:idpost", authorize, postCtrl.like); //C (l'user like un post)
router.delete("/like/:idpost", authorize, postCtrl.dislike); //D (l'user dislike un post)

router.post("/create/comment/:idpost", authorize, regExp, postCtrl.comment); //C (faire un commentaire sur un post)
router.get("/all/comment/:idpost", authorize, postCtrl.getComments); //R (lire tous les commentaires d'un post)
router.put(
  "/update/comment/:idcomment",
  authorize,
  regExp,
  postCtrl.updateComment
); //U (modifier un commentaire sur un post fait par l'user ou par un moderateur)
router.delete("/delete/comment/:idcomment", authorize, postCtrl.deleteComment); //D (supprimer un commentaire sur un post par l'user ou par un moderateur)

module.exports = router;

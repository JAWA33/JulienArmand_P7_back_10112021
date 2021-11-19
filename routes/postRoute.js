const express = require("express");
const authorize = require("../middlewares/authorize.js");
const regExpValidator = require("../middlewares/regExpValidator.js");

const postCtrl = require("../controllers/postCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER

//router.post("/create/:iduser", postCtrl.createPost); //C
router.get("/all", postCtrl.getAllPosts); //R
//router.put("/update/:idpost", postCtrl.updatePost); //U
//router.delete("/delete/:idpost", postCtrl.deletePost); //D

//router.post("/like/:idpost", postCtrl.like); //C (l'user like un post)
//router.get("/like/user/:idpost", postCtrl.userLike); //R (voir si l'user a liké)
//router.get("/like/:idpost", postCtrl.countLikes); //R (voir le nbre total de likes d'un post)
//router.delete("/like/:idpost", postCtrl.dislike); //D (l'user dislike un post)

//router.post("/create/comment/:idpost", postCtrl.comment); //C (faire un commentaire sur un post)
//router.get("/all/comment/:idpost", postCtrl.showComments); //R (lire tous les commentaires d'un post)
//router.put("/update/comment/:idpost", postCtrl.updateComment); //U (modifier un commentaire sur un post fait par l'user ou par un moderateur)
//router.delete("/delete/comment/:idpost", postCtrl.deleteComment); //D (supprimer un commentaire sur un post par l'user ou par un moderateur)

module.exports = router;

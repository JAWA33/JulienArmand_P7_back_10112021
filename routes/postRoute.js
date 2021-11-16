const express = require("express");

const postCtrl = require("../controllers/postCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER
router.get("", postCtrl.getAllPosts);
//router.post("/login" /*userCtrl.login*/);

module.exports = router;

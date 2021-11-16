const express = require("express");
const authorize = require("../middlewares/authorize.js");

const userCtrl = require("../controllers/userCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER
router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

module.exports = router;

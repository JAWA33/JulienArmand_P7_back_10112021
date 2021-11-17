const express = require("express");
const authorize = require("../middlewares/authorize.js");

const userCtrl = require("../controllers/userCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/all", userCtrl.getAllUser);
router.get("/:id", userCtrl.getOneUser);
router.delete("/logout", authorize, userCtrl.logout);

module.exports = router;

const express = require("express");
const authorize = require("../middlewares/authorize.js");
const regExp = require("../middlewares/regExpValidator.js");

const userCtrl = require("../controllers/userCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER : Ajout de authorize et multer
router.post("/signup", regExp, userCtrl.signup);
router.post("/login", regExp, userCtrl.login);

router.get("/all", authorize, userCtrl.getAllUser);
router.get("/:id", authorize, userCtrl.getOneUser);

router.delete("/logout", authorize, userCtrl.logout);

router.put("/update/:id", authorize, regExp, userCtrl.updateUser);
router.delete("/delete/:id", authorize, userCtrl.deleteUser);

module.exports = router;

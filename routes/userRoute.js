const express = require("express");
const authorize = require("../middlewares/authorize.js");
const regExpValidator = require("../middlewares/regExpValidator.js");

const userCtrl = require("../controllers/userCtrl.js");

const router = express.Router();

//! ROUTE A MODIFIER : Ajout de authorize et multer
router.post("/signup", regExpValidator, userCtrl.signup);
router.post("/login", regExpValidator, userCtrl.login);

router.get("/all", authorize, userCtrl.getAllUser);
router.get("/:id", authorize, userCtrl.getOneUser);

router.delete("/logout", authorize, userCtrl.logout);

router.put("/update/:id", authorize, regExpValidator, userCtrl.updateUser);
router.delete("/delete/:id", authorize, userCtrl.deleteUser);

module.exports = router;

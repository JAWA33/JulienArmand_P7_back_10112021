const express = require("express");
const authorize = require("../middlewares/authorize.js");

const userCtrl = require("../controllers/userCtrl.js");
const regExpValidator = require("../middlewares/regExpValidator.js");

const router = express.Router();

//! ROUTE A MODIFIER : Ajout de authorize et multer
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/all", userCtrl.getAllUser);
router.get("/:id", userCtrl.getOneUser);

router.delete("/logout", userCtrl.logout);

router.put("/update/:id", userCtrl.updateUser);

//! TEST REGEX :
router.post("/test", regExpValidator, userCtrl.updateUser);
//! TEST REGEX :

module.exports = router;

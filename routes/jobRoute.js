const express = require("express");

const jobCtrl = require("../controllers/jobCtrl.js");

const router = express.Router();

router.get("/", jobCtrl.getJobs); //R

module.exports = router;

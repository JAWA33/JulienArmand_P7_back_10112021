const dbConnect = require("../database/dbConnect.js");
const dotenv = require("dotenv");
const sqlReq = require("../utils/sqlRequest.js");
dotenv.config({ path: "../.env" });

//* R : ######### GET JOBS : Select all possibles jobs ###########

exports.getJobs = (req, res) => {
  dbConnect.query(sqlReq.allJobs, (err, result) => {
    if (err) {
      console.log("Erreur" + err);
    } else {
      res.status(200).json(result);
    }
  });
};

const dbConnect = require("../database/dbConnect.js");

exports.getAllPosts = (req, res) => {
  //! A REMPLACER juste pour Test :
  const sql = "SELECT * FROM gc_posts";

  dbConnect.query(sql, (err, result) => {
    if (err) {
      console.log("Erreur " + err);
    } else {
      res.status(201).json(result);
    }
  });
};

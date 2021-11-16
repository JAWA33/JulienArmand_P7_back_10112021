const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const dbConnect = require("../database/dbConnect.js");

dotenv.config({ path: "../.env" });

const authorize = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;

      const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
      const { validUser: checkUser } = decodedToken;
      const { statusUser: statusUser } = decodedToken;
      console.log({ validUser: checkUser });
      console.log({ statusUser: statusUser });
      console.log({ jwt: token });

      const sql_checkUser = "SELECT id_user FROM gc_users WHERE id_user=?";
      dbConnect.query(sql_checkUser, checkUser, (err) => {
        if (err) {
          res.clearCookie("jwt");
          res.status(403).json({ message: "403: unauthorized request" });
        } else {
          next();
        }
      });
    } else {
      res.clearCookie("jwt");
      res
        .status(403)
        .json({ message: "403: unauthorized access (Cookie not found)" });
    }
  } catch (error) {
    res.clearCookie("jwt");
    res.status(500).json({ message: "500: Error Access(Cookie delete)" });
  }
};

module.exports = authorize;

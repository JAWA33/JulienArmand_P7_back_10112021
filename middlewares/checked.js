const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "../.env" });

const checked = (req, res, next) => {
  console.log("Mon cookie : ########### ");
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.GC_TOKEN_SECRET);
    const { id_user: id_user } = decodedToken;

    console.log("cookie envoi ID");

    res.locals.user = id_user;
    next();
  } else {
    console.log("pas de cookies");

    res.locals.user = null;
    next();
  }
};

module.exports = checked;

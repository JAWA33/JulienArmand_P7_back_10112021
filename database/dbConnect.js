const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const dbConnect = mysql.createConnection({
  host: process.env.GC_ADMIN_HOST,
  user: process.env.GC_ADMIN_USER,
  password: process.env.GC_ADMIN_PASS,
  database: process.env.GC_ADMIN_DB,
});

module.exports = dbConnect;

import mysql from "mysql";

const dbConnect = mysql.createConnection({
  host: "localhost",
  user: "administrateur",
  password: "Admin_groupcom_33",
  database: "groupcom",
});

// dbConnect.connect((err) => {
//   if (err) {
//     console.log("Erreur de connexion");
//     throw err;
//   } else {
//     console.log("Mysql : Groupcom is connected");
//   }
// });

export default dbConnect;
